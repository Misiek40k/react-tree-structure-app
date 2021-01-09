import PropTypes from 'prop-types';

const Icon = ({ name }) => (<i className={`fas fa-${name}`}></i>);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
