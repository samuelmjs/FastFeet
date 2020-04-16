import React from 'react';
import PropTypes from 'prop-types';

import Item from '~/components/Item';
import Actions from '~/components/Actions';

export default function ProblemItem({ problem }) {
  return (
    <Item>
      <p>#{problem.delivery_id}</p>
      <p>{problem.description}</p>
      <Actions />
    </Item>
  );
}

ProblemItem.propTypes = {
  problem: PropTypes.shape({
    delivery_id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};
