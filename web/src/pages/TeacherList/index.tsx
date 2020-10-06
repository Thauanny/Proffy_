import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/pageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherITem';
import Input from '../../components/input';
import Select from '../../components/select';

import './style.css';
import api from '../../services/api';

function TeacherList(){

    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();
        
        const response = await api.get('classes', {
            params: {
                subject, 
                week_day,
                time
            }
        });

        setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
           <PageHeader title="Estes são os proffys disponiveis">

               <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={e=> setSubject(e.target.value)}
                        options={[
                            {value: "Artes", label: "Artes"},
                            {value: "Biologia", label: "Biologia"},
                            {value: "Matematica", label: "Matematica"},
                            {value: "ciencias", label: "ciencias"},
                            {value: "Portugues", label: "Portugues"},

                        ]}
                        
                    />
                    
                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={e=> setWeek_day(e.target.value)}
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
                        type="time" 
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => {setTime(e.target.value)}}
                        />

                    <button type="submit">
                        Buscar
                    </button>
               </form>
           </PageHeader>

           <main>
               {teachers.map((teacher: Teacher) => {
                   return <TeacherItem key={teacher.id} teacher = {teacher}/>
               })}
           </main>
        </div>
    );
}

export default TeacherList;