import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { LanguageProvider } from './language.context';
import { useLanguage } from './language.hooks';

describe('useLanguage specs', () => {
  it('should return a message with language equals "en" when it renders the hook', () => {
    // Arrange
    const provider: React.FunctionComponent = (props) => {
      return (
        <LanguageProvider initialLanguage="fr">
          {props.children}
        </LanguageProvider>
      );
    };

    // Act
    const { result } = renderHook(() => useLanguage(), {
      wrapper: provider,
    });

    act(() => {
      result.current.setLanguage('en');
    });

    // Assert
    expect(result.current.message).toEqual('The current language is: en');
  });
});
