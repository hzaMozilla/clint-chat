import { User } from '@src/interfaces';

export interface AuthRouterRequest {
  user: User;
}

export interface AuthRouterResponse {
  json: (params: AuthRouterRequest) => void;
  status: any;
}
