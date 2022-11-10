import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { NutritionFacts } from '../components/componentsDispatcher';
import Modal from '../styledComponents/Modal';
import { Loader } from '../components/componentsDispatcher';
import { BsYoutube } from 'react-icons/bs';
import { BiLinkAlt } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { getLikedMealsContext } from '../context/LikedMealsContext';

const Meal = () => {
  const { id } = useParams();

  const [isLoaded, setIsLoaded] = useState(false);

  const [modalIngredient, setModalIngredient] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Recipe Information and Ingredients

  const [recipeInfo, setRecipeInfo] = useState({});
  const [ingredients, setIngredients] = useState([]);

  // Context

  const { addMeal } = getLikedMealsContext();

  async function getRecipeById(id) {
    try {
      const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        ),
        item = await response.json();
      // console.log(item.meals[0]);
      setRecipeInfo(item.meals[0]);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  function getIngredients() {
    const ingredientsArray = [];
    let i = 1;
    for (const [key, value] of Object.entries(recipeInfo)) {
      if (key.toLowerCase().includes('ingredient') && value) {
        const object = {
          id: i,
          ingredient: recipeInfo[`strIngredient${i}`],
          measure: recipeInfo[`strMeasure${i}`],
        };
        ingredientsArray.push(object);
        i++;
      }
    }
    setIngredients(ingredientsArray);
  }

  function handleShowModal(ingredient) {
    setModalIngredient(ingredient);
    setShowModal(!showModal);
  }

  useEffect(() => {
    getRecipeById(id);
  }, [id]);

  useEffect(() => {
    getIngredients();
  }, [recipeInfo]);

  if (isLoaded) {
    return (
      <section className='center mb-20'>
        {showModal && (
          <NutritionFacts
            ingredientName={modalIngredient}
            onShowModal={handleShowModal}
          />
        )}
        {/* Title */}
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl md:text-5xl font-bold'>
            {recipeInfo.strMeal} Recipe's
          </h1>
          <FaHeart
            onClick={() => addMeal(recipeInfo)}
            className='w-8 h-8 hover:fill-red-600 cursor-pointer duration-200'
          />
        </div>

        <div className='flex space-x-6 text-xl sm:text-2xl'>
          <h3>Area: {recipeInfo.strArea}</h3>
          <h3>Category: {recipeInfo.strCategory}</h3>
        </div>

        <div className='max-w-2xl mx-auto flex flex-col items-center'>
          {/* Picture */}
          <div className='mt-5 w-full lg:w-1/2 flex justify-center items-center'>
            <img src={recipeInfo.strMealThumb} alt={recipeInfo.strMeal} />
          </div>

          {/* Ingredients */}
          <article className='w-full lg:pl-5 flex flex-col justify-center capitalize mt-10'>
            <h3 className='text-xl sm:text-2xl font-semibold underline underline-offset-3'>
              Ingredients:
            </h3>
            {ingredients.map((info) => {
              const { id, ingredient, measure } = info;

              return (
                <div
                  key={id}
                  className='ingredient-container flex justify-between items-center lg:pr-4 mt-4 lg:mt-6'>
                  <img
                    className='h-12 w-12'
                    src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
                    alt={ingredient}
                  />
                  <p className='text-lg sm:text-xl'>
                    {ingredient}: {measure}
                  </p>
                  <AiFillEye
                    onClick={() => handleShowModal(ingredient)}
                    className='cursor-pointer w-5 h-5'
                  />
                </div>
              );
            })}
          </article>
          {/* Cooking Instructions */}
          <article className='w-full lg:pl-5 flex flex-col justify-center capitalize mt-10'>
            <h3 className='text-xl sm:text-2xl font-semibold underline underline-offset-3'>
              Instructions:
            </h3>
            <p className='mt-4'>{recipeInfo.strInstructions}</p>
          </article>

          {/* Tags */}
          {recipeInfo.strTags && (
            <article className='w-full lg:pl-5 flex flex-col justify-center capitalize mt-10'>
              <h3 className='text-xl sm:text-2xl font-semibold underline underline-offset-3'>
                Tags:
              </h3>
              <p className='mt-4'>{recipeInfo.strTags.replaceAll(',', ', ')}</p>
            </article>
          )}

          {/* Links */}
          <section className='flex items-center mt-10 space-x-8'>
            {recipeInfo.strYoutube && (
              <a href={recipeInfo.strYoutube} target='_blank'>
                <BsYoutube className='w-8 h-8 hover:fill-red-600 duration-200 cursor-pointer' />
              </a>
            )}
            {recipeInfo.strSource && (
              <a href={recipeInfo.strSource} target='_blank'>
                <BiLinkAlt className='w-8 h-8 hover:fill-main-color duration-200 cursor-pointer' />
              </a>
            )}
          </section>
        </div>
      </section>
    );
  }

  if (!isLoaded) {
    return (
      <Modal>
        <Loader />
      </Modal>
    );
  }
};

export default Meal;
