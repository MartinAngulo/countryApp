import React from 'react'
import {useNavigate} from 'react-router-dom';
import stylos from '../StyleSheets/ActivityCard.module.css';

export default function ActivityCard({ data }) {
    const navigate = useNavigate();

    const onClick =(id)=>{
        navigate(`/detail/${id}`);
    }
    return (
        <div className={stylos.cont}>
            <p className={stylos.title}>{data.name}</p>
            <div>
                <p className={stylos.text}>Difficulty: {data.difficulty}</p>
                <p className={stylos.text}>Duration: {data.duration} hours</p>
                <p className={stylos.text}>Season: {data.season}</p>
            </div>
            {data.countries&&(<div className={stylos.cont2}>
                <p className={stylos.countries}>Countries:</p>
                <div className={stylos.flagCont}>
                    {
                        data.countries?.map(e=>(
                            <img
                            title={e.name}
                            className={stylos.flag}
                            src={e.imgFlag}
                            onClick={()=>{onClick(e.id)}}
                            alt='flag'
                            />
                        ))

                    }
                </div>
            </div>)}
        </div>
    )
}
