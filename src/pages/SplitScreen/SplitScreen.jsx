import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SplitScreen.css';
import NavBar from "../../components/NavBar/NavBar.jsx";
import SplitScreenLayoutToggle from '../../components/SplitScreenLayoutToggle/SplitScreenLayoutToggle.jsx';

export function SplitScreen() {
    const [layout, setLayout] = useState("column");

    useEffect(() => {
        const initialLayout = window.innerWidth <= 768 ? 'row' : 'column';
        handleLayoutChange(initialLayout);
    }, []);

    const handleLayoutChange = (mode) => {
        setLayout(mode);
        const container = document.querySelector('.splitscreen-container');
        const leftDiv = document.getElementById('splitscreen-1');
        const rightDiv = document.getElementById('splitscreen-2');

        {/* idk why but column and row are inverted. */ }
        if (mode === "column") {
            container.classList.remove('column-layout', 'inline-layout');
            container.classList.add('row-layout');
            leftDiv.classList.remove('column-layout', 'inline-layout');
            leftDiv.classList.add('row-layout');
            rightDiv.classList.remove('column-layout', 'inline-layout');
            rightDiv.classList.add('row-layout');
        } else if (mode === "row") {
            container.classList.remove('row-layout', 'inline-layout');
            container.classList.add('column-layout');
            leftDiv.classList.remove('row-layout', 'inline-layout');
            leftDiv.classList.add('column-layout');
            rightDiv.classList.remove('row-layout', 'inline-layout');
            rightDiv.classList.add('column-layout');
        } else if (mode === "inline") {
            container.classList.remove('row-layout', 'column-layout');
            container.classList.add('inline-layout');
            leftDiv.classList.remove('row-layout', 'column-layout');
            leftDiv.classList.add('inline-layout');
            rightDiv.classList.remove('row-layout', 'column-layout');
            rightDiv.classList.add('inline-layout');
        }
    };

    return (
        <>
            <NavBar book={undefined} chapter={undefined} />

            <h1 className="title">split screen</h1>
            <SplitScreenLayoutToggle onToggle={handleLayoutChange} />

            <div className="splitscreen-container">
                <div id="splitscreen-1">
                    <h1>left</h1>
                    <p>Lorem ipsum dolor sit amet. Aut enim mollitia aut dicta reprehenderit non vero voluptatem ut velit omnis sed voluptate velit. Sed repudiandae molestias ut quia culpa non reprehenderit nemo! Rem adipisci rerum ab dicta delectus vel nisi maxime non magni dolorem. Sed cupiditate repellendus vel nesciunt ipsa qui mollitia ipsam ab quam nesciunt qui labore dolor.

                        Nam commodi nesciunt qui cupiditate dicta id praesentium doloribus et iure quaerat cum ipsam molestias aut unde quia? Vel temporibus voluptatum non sequi vitae ab sunt accusantium. Qui consectetur velit et facere beatae a modi labore eum alias quia quo alias ullam a quia voluptatem aut corrupti asperiores. Quo asperiores ipsam ut voluptatem alias aut accusamus obcaecati.

                        Qui magnam saepe ad aspernatur quaerat At labore molestias. Aut quaerat illum ut architecto ducimus sed alias maiores.</p>
                </div>
                <div id='splitscreen-2'>
                    <h1>right</h1>
                    <p>Lorem ipsum dolor sit amet. Aut enim mollitia aut dicta reprehenderit non vero voluptatem ut velit omnis sed voluptate velit. Sed repudiandae molestias ut quia culpa non reprehenderit nemo! Rem adipisci rerum ab dicta delectus vel nisi maxime non magni dolorem. Sed cupiditate repellendus vel nesciunt ipsa qui mollitia ipsam ab quam nesciunt qui labore dolor.

                        Nam commodi nesciunt qui cupiditate dicta id praesentium doloribus et iure quaerat cum ipsam molestias aut unde quia? Vel temporibus voluptatum non sequi vitae ab sunt accusantium. Qui consectetur velit et facere beatae a modi labore eum alias quia quo alias ullam a quia voluptatem aut corrupti asperiores. Quo asperiores ipsam ut voluptatem alias aut accusamus obcaecati.

                        Qui magnam saepe ad aspernatur quaerat At labore molestias. Aut quaerat illum ut architecto ducimus sed alias maiores.</p>

                </div>
            </div>
        </>
    );
}

export default SplitScreen;
