/* eslint-disable import/prefer-default-export */
import { TransformedUser } from './interfaces/TransformedUser';
import { User } from './interfaces/User';

export const getTransformUser = (request: User): TransformedUser => {
  const {
    _id, name, age, phone, gender, email,
  } = request;
  // perform processing ...
  return {
    uuid: _id,
    field1: name,
    field2: age,
    field3: gender,
    field4: phone,
    field5: email,
  };
};
