import s from '../Button/Button.module.css';

const Button = props => (
  <div className={s.centered}>
    <button type="button" className={s.Button}>
      Load More
    </button>
  </div>
);

export default Button;
