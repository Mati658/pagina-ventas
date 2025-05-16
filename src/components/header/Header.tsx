import { useEffect, useState } from "react";
import "./header.css"
import { useNavigate} from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const usuario : string | null = localStorage.getItem('usuario')
  const [flagWidth, setFlagWidth] = useState<boolean>(false)
  const [flagMenu, setFlagMenu] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
        const width = window.innerWidth;
        setScreenWidth(width);
        setFlagWidth(width <= 800);

        if (width > 560) {
            setFlagMenu(false);
        }
    }

    window.addEventListener('resize', handleResize);
    // console.log(screenWidth)
    handleResize();
  }, [screenWidth]);


  const toggleMenu = () => {
    let flag = !flagMenu;
    console.log(flag)
    setFlagMenu(!flagMenu)
    if(flag){
        const menu = document.querySelector('.menu');
        if(menu){
            menu.classList.remove('slide-out-right');
            menu.classList.add('slide-in-right');
        }
        
    }else{
        const menu = document.querySelector('.menu');
        const checkbox = document.getElementById('checkbox') as HTMLInputElement;
        if(menu){
            menu.classList.remove('slide-in-right');
            menu.classList.add('slide-out-right');
            checkbox.checked = false;
        }
    }
  }

  const navegar = (path:string) =>{
      navigate(path);
  }

  return (
    <div className="header">
        <div className="container-header">
            <div className="logo" onClick={() => navegar('/')}>
                {/* <img src="/logo.png" className="img" /> */}
                
            </div>
        </div>
        
        <div className="container-right">

        </div>
    </div>
  )
}
