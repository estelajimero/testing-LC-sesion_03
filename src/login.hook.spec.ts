import { renderHook, act } from '@testing-library/react-hooks';
import * as api from './api';
import { Credential, User } from './model';
import { useLogin } from './login.hooks';

describe('useLogin spec', () => {
  it('should return an object: credential with default values and setCredential a function when it calls it', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useLogin());

    // Assert
    const defaultCredential: Credential = { name: '', password: '' };
    expect(result.current.credential).toEqual(defaultCredential);

    // cuando te da igual la función que sea y simplemente quieres comprobar
    // que es una función
    expect(result.current.setCredential).toEqual(expect.any(Function));
  });

  it('should update credential when it calls setCredential', () => {
    // Arrange
    const newCredential: Credential = { name: 'admin', password: 'test' };

    // Act
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setCredential(newCredential);
    });

    // Assert
    expect(result.current.credential).toEqual(newCredential);
  });

  it('should return user equals null and onLogin function', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useLogin());

    // Assert
    expect(result.current.user).toBeNull();
    expect(result.current.onLogin).toEqual(expect.any(Function));
  });

  it('should update user when it send valid credentials using onLogin', async () => {
    // Arrange
    const adminUser: User = {
      email: 'admin@email.com',
      role: 'admin',
    };
    // stub
    const stub = jest.spyOn(api, 'login').mockResolvedValue(adminUser);

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useLogin());

    act(() => {
      result.current.onLogin();
    });

    await waitForNextUpdate(); // espera a comprobar el resultado hasta que setUser actualice

    // Assert
    expect(stub).toHaveBeenCalled();
    expect(result.current.user).toEqual(adminUser);
  });
});
