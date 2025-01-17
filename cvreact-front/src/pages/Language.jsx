import { useState, useEffect } from 'react'

export default function Language() {
    const [language, setLanguage] = useState([]);
    const [languageName, setLanguageName] = useState('');
    const [languageLevel, setLanguageLevel] = useState('');
    const [isAdded, setIsAdded] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/languages', {
                mode: 'cors',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setLanguage(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/language', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ languageName, languageLevel: languageLevel || 'débutant' }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setLanguage([...language, data]);
        } catch (error) {
            console.error('Fetch error:', error);
        }
        fetchData(); // refresh
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/language/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setLanguage(language.filter((lang) => lang._id !== id));
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/language/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ languageName, languageLevel }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setLanguage(language.map((lang) => (lang._id === id ? data : lang)));
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }



    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Level</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {language.map((lang, index) => (
                        <tr key={lang._id}>
                            <th>{index + 1}</th>
                            <td>{lang.languageName}</td>
                            <td>{lang.languageLevel}</td>
                            <td className='flex justify-center items-center'>
                                {isUpdated === lang._id ? (
                                    <>
                                        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(lang._id); }} className="flex justify-center space-x-4 items-center">
                                            <input type="text" name="languageName" placeholder={isUpdated === lang._id ? "Update Language Name" : ""} value={languageName} onChange={(e) => setLanguageName(e.target.value)} className="input input-secondary w-full max-w-xs" />
                                            <select name="languageLevel" value={languageLevel} onChange={(e) => setLanguageLevel(e.target.value)} className="select select-secondary w-full max-w-xs">
                                                <option value="débutant">débutant</option>
                                                <option value="bien">bien</option>
                                                <option value="langue maternelle">langue maternelle</option>
                                            </select>
                                            <button type="submit" className="btn btn-secondary">Submit</button>
                                            <button type="button" className="btn btn-outline btn-error" onClick={() => setIsUpdated(null)}>Cancel</button>
                                        </form>
                                    </>
                                ) : (
                                    <button className="btn btn-warning text-white" onClick={() => setIsUpdated(lang._id)}>Update</button>
                                )}
                                <button className="btn btn-error text-white ml-2" onClick={() => handleDelete(lang._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary mt-4 float-right" onClick={() => setIsAdded(!isAdded)}>{isAdded ? 'Cancel' : 'Ajouter'}</button>
            {isAdded &&<form onSubmit={handleSubmit} className='flex justify-center space-x-4 mt-4 mb-4'>
                <input type="text" name="languageName" placeholder="Saisir une langue" value={languageName} onChange={(e) => setLanguageName(e.target.value)} className="input input-secondary w-full max-w-xs" />
                <select name="languageLevel" value={languageLevel} onChange={(e) => setLanguageLevel(e.target.value)} className="select select-secondary w-full max-w-xs">
                    <option value="débutant" defaultValue>débutant</option>
                    <option value="bien">bien</option>
                    <option value="langue maternelle">langue maternelle</option>
                </select>
                <button type="submit" className="btn btn-secondary">Submit</button>
            </form>}
        </div>
    )
}
