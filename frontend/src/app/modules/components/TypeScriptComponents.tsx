import React, { useState } from 'react'

type GreetingsProps = {
    name: string;
    onClick: (name: string) => void;
};


const gereet: React.FC<GreetingsProps> = ({ name }) => {
    return (
        <>
        </>
    )
}


const TypeScriptComponents = () => {
    const [form, setForm] = useState({
        name: '',
        description: ''
    })

    const { name, description } = form;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value   
        })
    }

    const onSubmit = (form: { name: string; description: string }) => {
        console.log(form);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(form);
        setForm({
          name: '',
          description: ''
        }); 
    }


    const click = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        console.log(e)
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input name="name" value={name} onChange={(e) => onChange(e)} />
                <input name="description" value={description} onChange={(e) => onChange(e)} />
                <button type="submit">등록</button>
            </form>
        </>
    )
}

export {TypeScriptComponents}