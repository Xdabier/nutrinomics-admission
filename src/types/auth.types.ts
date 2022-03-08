import { UserInterface } from './user.type';

type RawUserType = Omit<UserInterface, '_id'>;
export type SignUpPayloadType = Required<RawUserType>;
export type LoginPayloadType = Omit<RawUserType, 'username'>;
