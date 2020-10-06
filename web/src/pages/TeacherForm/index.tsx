import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom'
import PageHeader from '../../components/pageHeader';
import Input from '../../components/input';
import Textarea from '../../components/textArea';
import Select from '../../components/select';

import WarningIcon from '../../assets/images/icons/warning.svg'
import './styles.css'
import api from '../../services/api';



function TeacherForm(){
    
    const history = useHistory()

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleitems, setScheduleItems] = useState([ {week_day: 0, from: '', to: ''}])

    function addNewScheduleItem(){

        setScheduleItems([
            ...scheduleitems,
            {
                week_day: 0,
                from:'',
                to:''
            }
        ]);
    }

    function setScheduleItemsValue(position: number, field: string,  value:string){
        const updatedScheduleItems = scheduleitems.map((scheduleItem, index) => {
            if(index === position){
                return {...scheduleItem, [field]: value}
            }

            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes',{
            name, 
            avatar, 
            whatsapp, 
            bio, 
            subject, 
            cost: Number(cost), 
            schedule: scheduleitems
        }).then(()=>{
            alert('Cadastrado com Sucesso');

            history.push('/')
        }).catch(()=>{
            alert('Erro no cadastro')
        })

    }

    return (
        <div id="page-teacher-form" className="container">
           <PageHeader 
                title="Que incrivel que vc quer dar aula"
                description="O primeiro passo é preencher o formulario de inscrição"
           />

           <main>
               <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                                name="nome" 
                                label="Seu nome completo"
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
                            />
                        <Input 
                                name="avatar" 
                                label="avatar"
                                value={avatar}
                                onChange={(e) => {setAvatar(e.target.value)}}
                            />
                        <Input 
                                name="whatsapp" 
                                label="whatsapp"
                                value={whatsapp}
                                onChange={(e) => {setWhatsapp(e.target.value)}}
                            />
                        <Textarea 
                                name="bio" 
                                label="biografia"
                                value={bio}
                                onChange={(e) => {setBio(e.target.value)}}
                            />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre as aulas</legend>

                        <Select 
                                name="subject" 
                                label="Matéria"
                                value={subject}
                                onChange={(e) => {setSubject(e.target.value)}}
                                options={[
                                    {value: "Artes", label: "Artes"},
                                    {value: "Biologia", label: "Biologia"},
                                    {value: "Matematica", label: "Matematica"},
                                    {value: "ciencias", label: "ciencias"},
                                    {value: "Portugues", label: "Portugues"},

                                ]}
                                
                            />
                        <Input 
                                name="cost" 
                                label="custo da sua hora por aula "
                                value={cost}
                                onChange={(e) => {setCost(e.target.value)}}
                                />

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários Disponiveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo Horario
                            </button>
                            </legend>
                            
                            {scheduleitems.map((scheduleitem, index) =>{
                                return(  
                                    <div key={scheduleitem.week_day} className="schedule-item">
                                        <Select 
                                            name="week_day" 
                                            label="Dia da semana"
                                            value={scheduleitem.week_day}
                                            onChange={(e) => setScheduleItemsValue(index, 'week_day', e.target.value)}
                                            options={[
                                                {value: "1", label: "Domingo"},
                                                {value: "2", label: "Segunda"},
                                                {value: "3", label: "Terça"},
                                                {value: "4", label: "Quarta"},
                                                {value: "5", label: "Quinta"},
                                                {value: "6", label: "Sexta"},
                                                {value: "7", label: "Sabado"},

                                            ]}
                                            
                                        />
                                        <Input 
                                            name="from"
                                            label="Das" 
                                            type="time"
                                            value={scheduleitem.from}
                                            onChange={(e) => setScheduleItemsValue(index, 'from', e.target.value)}
                                            />
                                        <Input 
                                            name="to" 
                                            label="Até" 
                                            type="time"
                                            value={scheduleitem.to}
                                            onChange={(e) => setScheduleItemsValue(index, 'to', e.target.value)}
                                            />
                                </div>
                            );
                            })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={WarningIcon} alt="imagem de aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados.
                        </p>
                        <button type="submit" >Salvar Cadastro</button>

                    </footer>
                </form>
           </main>
        </div>
    );
}

export default TeacherForm;