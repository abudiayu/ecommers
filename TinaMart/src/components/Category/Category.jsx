import React from 'react';
import {CategoryInfo} from "./CategoryFullInfo";
import CategoryCard from './CategoryCard';
import classes from "./category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {  
        CategoryInfo.map((infos)=> {
            return <CategoryCard key={infos.name} data = {infos}/>
        })
      }
    </section>
  )
}

export default Category;
