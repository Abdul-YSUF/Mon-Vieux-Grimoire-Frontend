/* eslint-disable */
import * as PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./BookRatingForm.module.css";
import { generateStarsInputs } from "../../../lib/functions";
import { APP_ROUTES } from "../../../utils/constants";
import { useUser } from "../../../lib/customHooks";
import { rateBook } from "../../../lib/common";

function BookRatingForm({ rating, setRating, userId, setBook, id }) {
  const { connectedUser, auth } = useUser();
  const navigate = useNavigate();
  const { register, watch, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues: { rating: rating || 0 },
  });

  const watchedRating = watch("rating");

  useEffect(() => {
    if (watchedRating !== undefined) {
      setRating(Number(watchedRating));
    }
  }, [watchedRating]);

  useEffect(() => {
    setValue("rating", rating);
  }, [rating, setValue]);

  const onSubmit = async () => {
    if (!connectedUser || !auth) {
      navigate(APP_ROUTES.SIGN_IN);
      return;
    }

    try {
      const updatedBook = await rateBook(id, userId, rating);
      if (updatedBook) {
        setBook({ ...updatedBook, id: updatedBook._id });
      } else {
        alert("Erreur lors de la notation");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la notation");
    }
  };

  return (
    <div className={styles.BookRatingForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{rating > 0 ? "Votre Note" : "Notez cet ouvrage"}</p>
        <div className={styles.Stars}>
          {generateStarsInputs(rating, register)}
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

BookRatingForm.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  setBook: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default BookRatingForm;
