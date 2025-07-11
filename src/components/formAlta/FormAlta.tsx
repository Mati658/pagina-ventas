import './formAlta.css'
import { useEffect, useState } from 'react';
import { useStorage } from '../../context/StorageContext';
import { useDatabase } from '../../context/DatabaseContext';
import { useLoader } from '../../context/LoaderContext';
import { Producto } from '../../classes/Producto';

type Props = {
    productoEdit:any | null;
    onSubmit:()=>void;
    sendProducto:(producto:Producto)=>void
}

export default function FormAlta({productoEdit = null, onSubmit, sendProducto}:Props) {
  const { uploadFoto } = useStorage()
    const { getTabla ,altaDB, update } = useDatabase()
    const { setLoader } = useLoader();

    const [flagModal, SetFlagModal] = useState(false)
    const [flagImagenEdit, SetFlagImagenEdit] = useState(false)
    const [mensaje, SetMensaje] = useState('')
    const [claseModal, SetClaseMOdal] = useState('success')
    const [svgModal, setSvgModal] = useState<any>()

    const [nombre, setNombre] = useState<string>("");
    const [stock, setStock] = useState<string>("");
    const [precio, setPrecio] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    
    const [especificaciones, setEspecificaciones] = useState<any[]>([{clave:"",valor:""}]);

    const [categorias, setCategorias] = useState<any>([]);

    const [categoria, setCategoria] = useState<string>("0");
    const [nuevaCategoria, setNuevaCategoria] = useState<string>("");

    const [subCategoria, setSubCategoria] = useState<string>("0");
    const [nuevaSubCategoria, setNuevaSubCategoria] = useState<string>("");

    const [imagen, SetImagen] = useState('')
    const [imagenURL, SetImagenURL] = useState('')

    useEffect(()=>{
        getTabla('categorias', '*').then((res:any)=>{
            setCategorias(res)
        })
    },[])

    const obtenerImagen = ($event : any) => {
        //---Para SUBIR la imagen---
        SetImagen($event.target.files[0]);        
    
        //---Para MOSTRAR la imagen---
        const fileURL = $event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          SetImagenURL(reader.result as string);
        };
    
        reader.readAsDataURL(fileURL);
    }

    const agregarEspecificacion = () => {
        let data = {
            clave:"",
            valor:""
        }
    setEspecificaciones([...especificaciones, data]);
    }

    const verificar = () =>{
        setLoader(true)
        if (imagen != "" && (
            nombre && Number(stock) != 0 && Number(precio) != 0 && descripcion && especificaciones && categoria && subCategoria)) {
            return productoEdit != null ? updateJugador() : subirProducto()
        }
        setLoader(false)
        SetClaseMOdal('warning')
        setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            ></path>
          </svg>)
        SetMensaje('¡Verifique los campos!')
        SetFlagModal(true)
        return setTimeout(() => {
            SetFlagModal(false)
        }, 3100);

    }

    const subirProducto = async() =>{
        let url : string | false = await uploadFoto(imagen, nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "")+Date.now());
        // let url : string | false = "url";
        if (url) {
            
            let catTemp = categoria;
            let subCatTemp = subCategoria;



            if (categoria == '-1' || subCategoria == '-1') {
                let etiquetas:string[] = []
                let id!:number 
                categorias.map((item:any)=>{
                    if (item.categoria == categoria) {
                        etiquetas = item.etiquetas
                        id = item.id
                    }
                })

                let data = {
                    categoria:catTemp,
                    etiquetas:etiquetas
                }

                if (categoria == '-1') {
                    catTemp = nuevaCategoria;
                    data.categoria = catTemp;
                }
                if (subCategoria == '-1') {
                    subCatTemp = nuevaSubCategoria;
                    data.etiquetas.push(subCatTemp);
                    if (id) {   
                        await update('categorias', data, id)
                        return
                    }
                }
                await altaDB('categorias', data);
                console.log(data)
            }


            const producto = new Producto(nombre, Number(precio), Number(stock), descripcion, especificaciones, catTemp, subCatTemp, 1, ["0","0"], false, 0, url)
            
            // console.log(producto.toJson());
            if(await altaDB('productos', producto.toJson())){
                setLoader(false)
                limpiar();
                SetMensaje('Producto Agregado!')
                SetClaseMOdal('success')
                setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    ></path>
                </svg>)
                SetFlagModal(true)
                return setTimeout(() => {
                    SetFlagModal(false)
                }, 3100);
            }
            setLoader(false)
            SetClaseMOdal('error')
            setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                ></path>
              </svg>)
            SetMensaje('¡Error al agregar!')
            SetFlagModal(true)
            return setTimeout(() => {
                SetFlagModal(false)
            }, 3100);
        }   
    }

    const updateJugador = async() =>{
        let url : string | false = imagenURL
        if (flagImagenEdit) {
            setLoader(true)
            url = await uploadFoto(imagen, nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "")+Date.now());
        }
        if (url) {

            const producto = new Producto(nombre, Number(precio), Number(stock), descripcion, especificaciones, categoria, subCategoria, 1, ["0","0"], false, 0, imagenURL)
            
            if(await update('productos', producto.toJson(), productoEdit.id)){
                setLoader(false)
                limpiar();
                SetMensaje('¡Producto Modificado!')
                SetClaseMOdal('success')
                setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    ></path>
                </svg>)
                SetFlagModal(true)
                setTimeout(() => {
                    SetFlagModal(false)
                }, 3100);
                producto.Id = productoEdit.id
                sendProducto(producto)
                onSubmit();
                return;
            }
            setLoader(false)
            SetClaseMOdal('error')
            setSvgModal(<svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                ></path>
              </svg>)
            SetMensaje('¡Error al modificar!')
            SetFlagModal(true)
            setTimeout(() => {
                SetFlagModal(false)
            }, 3100);
            onSubmit();
            return;
        }   
        setLoader(false)
    }

    const limpiar = () =>{
        setNombre('');
        setStock("");
        setPrecio("");
        setDescripcion("");
        setEspecificaciones([{clave:"",valor:""}]);
        setCategoria("0");
        setSubCategoria("0");
        SetImagen('');
        SetImagenURL('');
        SetFlagImagenEdit(true);
    }

    return (
        <div className='container-form-alta'>
            {flagModal && ( 
            <div className='modal'>
                <ul className="notification-container">
                <li className={`notification-item ${claseModal}`}>
                    <div className="notification-content">
                    <div className="notification-icon">
                        {svgModal}
                    </div>
                    <div className="notification-text">{mensaje}</div>
                    </div>
                    <div className="notification-progress-bar"></div>
                </li>
                </ul>
            </div>  
            )}

            <form className="form">
                <p className="title inter">Alta producto</p>

                <div className="flex">
                    <label>
                        <input required={true} placeholder="" type="text" className="input" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
                        <span>Producto</span>
                    </label>

                    <label>
                        <input required={true} placeholder="" type="number" className="input" value={stock} onChange={(e)=>setStock(e.target.value)}/>
                        <span>Stock</span>
                    </label>
                </div>  
                        
                <label>
                    <input required={true} placeholder="" type="number" className="input" value={precio} onChange={(e)=>setPrecio(e.target.value)}/>
                    <span>Precio</span>
                </label> 
                    
                <label>
                    <textarea required={true} placeholder="Descripcion" className="input" value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}></textarea>
                    {/* <span></span> */}
                </label>

                <p className="middle-title inter">Especificaciones</p>

                {especificaciones.map((item:any, i=0)=>(
                    <div className="flex" key={i}>
                        <label>
                            <input required={true} placeholder="" type="text" className="input" onChange={(e) => {
                            const updated = [...especificaciones];
                            updated[i++] = { ...item, clave: e.target.value };
                            console.log(updated)
                            setEspecificaciones(updated);
                            }} 
                            value={item.clave} />
                            <span>Clave</span>
                        </label>

                        <label>
                            <input required={true} placeholder="" type="text" className="input" onChange={(e) => {
                            const updated = [...especificaciones];
                            updated[i] = { ...item, valor: e.target.value };
                            console.log(updated)
                            setEspecificaciones(updated);
                            }} 
                            value={item.valor} />
                            <span>Valor</span>
                        </label>
                    </div>  
                ))}
                <button type='button' className="submit-alta" onClick={agregarEspecificacion}>Agregar</button>
                <div className='gap'></div>
                
                <p className="middle-title inter">Categoría</p>

                <label>
                    <select required={true}  className="input" value={categoria} onChange={(e)=>{setCategoria(e.target.value); e.target.value=='-1' && setSubCategoria(e.target.value)}}>
                        <option disabled value='0'>Categoria</option>
                        {categorias && categorias.map((item:any)=>(
                            <option key={item.categoria} value={item.categoria}>{item.categoria}</option>
                        ))}
                        <option value="-1">Otra</option>
                    </select>
                    <span>Categoría</span>
                </label>

                {categoria == "-1" &&(
                    <label>
                        <input required={true} placeholder="" type="text" className="input" value={nuevaCategoria} onChange={(e)=>setNuevaCategoria(e.target.value)}/>
                        <span>Categoría</span>
                    </label>
                )}
                
                <label>
                    <select required={true}  className="input" value={subCategoria} onChange={(e)=>setSubCategoria(e.target.value)}>
                        <option disabled value='0'>Sub Categoria</option>
            
                        {categorias && categorias.map((item:any)=>(
                            item.categoria == categoria && (
                                item.etiquetas.map((etiqueta:any)=>(
                                    <option key={etiqueta} value={etiqueta}>{etiqueta}</option>
                                ))
                            )
                        ))}
                        <option value="-1">Otra</option>
                    </select>
                    <span>Sub Categoría</span>
                </label>

                {subCategoria == "-1" &&(
                    <label>
                        <input required={true} placeholder="" type="text" className="input" value={nuevaSubCategoria} onChange={(e)=>setNuevaSubCategoria(e.target.value)}/>
                        <span>Sub Categoría</span>
                    </label>
                )}

                <label htmlFor="file" className="custum-file-upload">
                    <div >
                        {
                            imagenURL != '' ? (
                                <img src={imagenURL} className="icon-img" />
                            ) : (
                                <svg viewBox="0 0 24 24" fill='' xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill='' /> </g></svg>
                        )}

                    </div>
                    <div className="text">
                        <span>Click para subir la imagen</span>
                    </div>
                    <input required={true} id="file" type="file" onChange={(e) => obtenerImagen(e)}/>
                </label>

                <button type='button' className="submit-alta" onClick={verificar}>Subir</button>
                <p className="signin">¿Ya tenés una cuenta? <a href="/login">Iniciar</a> </p>
            </form>
        </div>
    )
}
