import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'


const Firestore = () => {

    const [movieList, setMovieList] = useState([])

    // new movie state (create)
    const [newMovieTitle, setNewMovieTitle] = useState("");
    const [newReleasedate, setNewReleaseDate] = useState(0);
    const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

    // updated state
    const [updatedTitle, setUpdatedTitle] = useState("");

    const movieCollectionRef = collection(db, "movies")



    useEffect(() => {
        getMoviesList();
    }, [])

    const getMoviesList = async () => {
        // READ
        // SET THE MOVIE LIST
        try {
            const data = await getDocs(movieCollectionRef);
            const filterdata = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setMovieList(filterdata)
        } catch (error) {
            console.log(error);
        }
    }




    const onSubmitMovie = async () => {
        try {
            await addDoc(movieCollectionRef, {
                title: newMovieTitle,
                releaseDate: newReleasedate,
                oscar: isNewMovieOscar,
            })
            getMoviesList()
        } catch (error) {
            console.log(error);
        }

    }

    const deleteMovie = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id)
            await deleteDoc(movieDoc);
            getMoviesList()
        } catch (error) {
            console.log(error);
        }
    }

    // update
    const updateMovieTitle = async (id) => {
        try {
            const movieDoc = doc(db, "movies", id)
            await updateDoc(movieDoc,{title:updatedTitle});
            getMoviesList();
        }
        catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
            <div>
                {/* create */}
                <input type="text" placeholder='enter movie.....' onChange={(e) => setNewMovieTitle(e.target.value)} />
                <input type="number" placeholder='enter release date....' onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
                <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setIsNewMovieOscar(e.target.checked)} />
                <label>Recevied and Oscar</label>
                <button onClick={onSubmitMovie}>Submit</button>

            </div>

            {/* read */}
            {movieList.map((movie) => (
                <div >
                    <h1 style={{ color: movie.oscar ? "green" : "red" }}>{movie.title}</h1>
                    <h2>Date : {movie.releaseDate}</h2>
                    <h3>{movie.oscar}</h3>
                    <button onClick={() => deleteMovie(movie.id)}>Delete</button>

                    {/* update */}
                    <input type="text" placeholder='Update Title....' onChange={(e) => setUpdatedTitle(e.target.value)} />
                    <button onClick={() => updateMovieTitle(movie.id)}>update</button>

                </div>
            ))}
        </div>
    )
}

export default Firestore