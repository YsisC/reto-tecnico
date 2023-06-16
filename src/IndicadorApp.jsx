import React, { useState, useEffect } from 'react'
import { useForm } from "./hooks/useForm"
import axios from 'axios'
import Modal from "./components/Modal";
import Graphic from './components/Graphic';

export default function Indicadores() {

    const {
        formState,
        onResetForm,
        onInputChange,
        setFormState

    } = useForm({
        codigoIndicador: '',
        fechaIndicador: new Date().toISOString().split('T')[0],
        nombreIndicador: '',
        origenIndicador: '',
        tiempoIndicador: null,
        valorIndicador: 0,
        unidadMedidaIndicador: ''
    });
    const {
        codigoIndicador, fechaIndicador,
        nombreIndicador,
        origenIndicador,
        tiempoIndicador,
        valorIndicador,
        unidadMedidaIndicador
    } = formState;
    const [isOpen, setIsOpen] = useState(false);
    const [indicadores, setIndicadores] = useState([])
    const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const URI = 'http://localhost:3000/api/indicadores';

    const sendRequest = async () => {

        try {
            const res = await axios.get(URI);
            setIndicadores(res.data)
        } catch (e) {
            console.log(e)
        }

    }


    useEffect(() => {
        sendRequest();
    }, [])


    const onFormSubmit = async (event) => {
        event.preventDefault();

        if (nombreIndicador.length <= 1 && codigoIndicador.length <= 1) return;

        try {
            if (!isEdit) {
                const res = await axios.post(URI, formState)
                console.log(res.data)
            } else {
                await handleUpdate(); //
            }
            onResetForm();
            sendRequest();
        } catch (e) {
            alert(e)
        }

    };


    const handleUpdate = async () => {
        try {

            const res = await axios.put(`${URI}/${editingId}`, formState);
            console.log(res.data);
            setIsEdit(false);
            setEditingId(null);


        } catch (error) {
            alert(error);
        }
    };
    const removeIndicador = async (id) => {
        try {
            const res = await axios.delete(`${URI}/${id}`)
            console.log('Item successfully deleted.', res, id, `${URI}/${id}`)
            sendRequest();
        } catch (error) {
            alert(error)
        }
    }

    const onHandleDelete = (id) => {
        removeIndicador(id);

    };
    const handleEdit = (id) => {
        setIsEdit(true);
        setEditingId(id);

        const indicadorApi = indicadores.find((item) => item.id === id);
        console.log(indicadorApi)
        setFormState(indicadorApi)

    };

    return (

        <div className='container'>
            <h1>Indicadores</h1>
            <section>
               <div className='leftSide'> <Graphic indicadores={indicadores}/></div> 
                <div className='rightSide'> 
                <h2> Agregar Indices:</h2>
                 <form onSubmit={onFormSubmit} >
                    <div className="mb-3">
                        <label className='text-start'>Codigo Indicador</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Agrega codigoIndicador"
                            name="codigoIndicador"
                            value={codigoIndicador}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fechaIndicador" className='text-start'>Fecha de indicador</label>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Agrega fechaIndicador"
                            name="fechaIndicador"
                            value={fechaIndicador}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nombreIndicador" className='text-start'>nombre de  Indicador</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Agrega nombre de indicador"
                            name="nombreIndicador"
                            value={nombreIndicador}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="origenIndicador" className='text-start'>Origen  Indicador</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Agrega origenIndicador"
                            name="origenIndicador"
                            value={origenIndicador}
                            onChange={onInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="unidadMedidaIndicador" className='text-start'>Unidad de Medida Indicador</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Agrega unidadMedidaIndicador"
                            name="unidadMedidaIndicador"
                            value={unidadMedidaIndicador}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fechaIndicador" className='text-start'>Valor Indicador</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Agrega valor Indicador"
                            name={"valorIndicador"}
                            value={valorIndicador}
                            onChange={onInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark mt-3 mb-4">
                        {isEdit ? 'Actualizar' : 'Guardar'}
                    </button>
                </form>
                </div>
            </section>

       
               
            
            <table className="table mt-3 table-hover" >
                <thead>
                    <tr>
                        <th scope="col">Codigo Indicador</th>
                        <th scope="col">Unidad Medida Indicador</th>
                        <th scope="col">Fecha Indicador</th>
                        <th scope="col">Nombre Indicador</th>
                        <th scope="col">Valor </th>
                        <th scope="col">Accion</th>
                    </tr>
                </thead>

                {indicadores.map((res) => {
                    return (
                        <React.Fragment key={res.id}>

                            <tbody>
                                <tr >

                                    <td>{res.codigoIndicador}</td>
                                    <td>{res.unidadMedidaIndicador}</td>
                                    <td>{res.fechaIndicador}</td>
                                    <td>{res.nombreIndicador}</td>
                                    <td>{res.valorIndicador}</td>
                                    <td>
                                        <button className='btn btn-success' onClick={() => handleEdit(res.id)} >
                                            Edit
                                        </button>

                                        <button className="btn btn-danger mx-3 " onClick={() => onHandleDelete(res.id)}>
                                            <span >
                                                delete
                                            </span>
                                        </button>



                                    </td>

                                </tr>
                            </tbody>

                        </React.Fragment>


                    )
                })}

            </table>
        </div>
    )
}