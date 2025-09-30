
import { Link } from 'react-router-dom';
import Card from './components/Card'
import './Service.css'

function Service() {
    return (
        <div className='containerS'>
            <header>
                <h2 className='textH'>Bem Vindo</h2>
            </header>
            <div>
                <h3 className='text'>Escolha seu serviço</h3>
                <div className='cardList'>
                  <Card title='Corte' value='30' /> 
                   <Card title='Barba' value='45' />
                   <Card title='Corte + Barba' value='50' />
                   <Card title='Corte + Sombrancelha'  value='35'/>
                   <Card title='Pezinho' value='20'/>
                 
     
                   
                </div>
                 <Link to='/'><button className='buttonS'>Sair</button></Link>
            </div>
           
        </div>
    )
}
export default Service