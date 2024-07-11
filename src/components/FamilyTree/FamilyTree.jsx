import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./FamilyTree.css"
import characters from '../../../public/data/characters';
import { Person } from "./Person.jsx"


export function FamilyTree({ character }) {
    const father = character.getFather();
    const mother = character.getMother();
    const children = character.getChildren();
    const siblings = character.getSiblings();
    const spouses = character.getSpouses();
    const descendant = character.getDescendant();
    const grandchildren = character.getGrandchildren();

    //in the middle row, shows SELF, one wife*, all siblings*, and each of their wives* (*IF APPLICABLE)
    return (
        <>
            <div className="treeBox">
                {<div className="grandparentsRow">
                    {father && father.getFather() && <Person character={father.getFather()} relation="grandparent" />}
                    {father && father.getMother() && <Person character={father.getMother()} relation="grandparent" />}
                    {mother && mother.getFather() && <Person character={mother.getFather()} relation="grandparent" />}
                    {mother && mother.getMother() && <Person character={mother.getMother()} relation="grandparent" />}
                </div>}

                {descendant && <div className='descendantRow'>
                    <Person character={descendant} relation="descendant" />
                </div>}

                {(father || mother) && <div className="parentsRow"> {/* the father || mother makes the row only appear if there is a parent. This is a design choice */}
                    {father && <Person character={father} relation="father" />}
                    {mother && <Person character={mother} relation="mother" />}

                    {/* this comment shows parents siblings (i think) but i remove it because what order do u put them in? there is no intuitve way
                    {father && father.getSiblings() && father.getSiblings().length > 0 && father.getSiblings().map((tio) => {
                        return <Person character={tio} relation="tio" />;
                    })}

                    {mother && mother.getSiblings() && mother.getSiblings().length > 0 && mother.getSiblings().map((tio) => {
                        return <Person character={tio} relation="tio" />;
                    })}*/}
                </div>}



                <div className="siblingsRow">
                    {/*siblings */}
                    {siblings &&
                        siblings.map((sibling) => (
                            (sibling.id == character.id ?
                                <> {/* if the sibling is the current person */}
                                    <Person character={sibling} relation={'self'} />
                                    {spouses && spouses.length > 0 && <Person character={spouses[0]} relation={'spouse'} />}
                                </>
                                :
                                <>
                                    <Person character={sibling} relation={'sibling'} />
                                    {sibling.getSpouses()[0] && <Person character={sibling.getSpouses()[0]} relation={'cuañado'} />}
                                </>
                            )
                        ))
                    }
                    {/*if they have no siblings they wouldnt be displayed otherwise */}
                    {!siblings && <Person character={character} relation={'self'} />}
                    {!siblings && spouses && spouses.length > 0 && <Person character={spouses[0]} relation={'spouse'} />}
                </div>
                <div className="childrensRow">
                    {children &&
                        children.map((child) => (
                            <>
                                <Person character={child} relation="child" />
                                {child.getSpouses().length > 0 && (
                                    <Person character={child.getSpouses()[0]} relation="childinlaw" />
                                )}
                            </>
                        ))
                    }
                </div>
                <div className="grandchildrensRow">
                    {grandchildren &&
                        grandchildren.map((grandchild) => (
                            <Person character={grandchild} relation="grandchild" />
                        ))
                    }
                </div>
            </div >
        </>
    );
}

function getCharacterById(id) {
    return characters.find(character => character.id === id);
}
function getCharactersByIds(ids) {
    return characters.filter(character => ids.includes(character.id));
}
