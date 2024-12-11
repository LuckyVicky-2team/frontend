/* eslint-disable no-undef */
import { render, screen, userEvent } from '../../../../test/test-utils';
import axios from 'axios';

import { expect, jest } from '@jest/globals';
import Signin from './page';
jest.mock('axios', () => ({
  post: jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          success: false,
          info: '사용자가 존재하지 않습니다',
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          success: false,
          info: '비밀번호가 올바르지 않습니다',
        },
      })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          success: true,
          token: 'xxx',
        },
      })
    ),
}));
describe('sign in process', () => {
  const mockAxios = jest.spyOn(axios, 'post');
  beforeEach(() => {
    render(<Signin />);
    jest.clearAllMocks();
  });
  async function typeLoginForm(email: string, password: string) {
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
    const pwdInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');

    await user.type(emailInput, email);
    await user.type(pwdInput, password);
  }

  async function clickLoginButton() {
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: '로그인하기' }));
  }

  it('Should have two input & one button ', () => {
    const emailInput = screen.getByPlaceholderText('이메일을 입력해주세요');
    const pwdInput = screen.getByPlaceholderText('비밀번호를 입력해주세요');

    const loginButton = screen.getByRole('button', { name: '로그인하기' });

    expect(emailInput).toBeInTheDocument();
    expect(pwdInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  it('Login button disabled if not typing the username & password', () => {
    const loginButton = screen.getByRole('button', { name: '로그인하기' });
    expect(loginButton).toBeDisabled();
  });
  it('login api should be called after clicking the login button', () => {});

  it('Failed to login if username does not have @ ', async () => {
    await typeLoginForm('invalid!Email.com', 'password');
    await clickLoginButton();

    expect(mockAxios).not.toHaveBeenCalled();
  });
  // it('Failed to login if not typing the correct password', async () => {});
  // it('Succeeded to login if typing th correct username & password', async () => {});
  // it('login should be called after clicking the button',()=>{})
});
