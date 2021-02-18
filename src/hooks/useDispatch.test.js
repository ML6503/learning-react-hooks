import { renderHook } from '@testing-library/react-hooks';
import { StateContextWrapper } from './testUtils';
import useDispatch from './useDispatch';

test('shoud use dispatch', () => {
    const { result } = renderHook(
        () => useDispatch(),
        { wrapper: StateContextWrapper } 
    );

    expect(typeof result.current).toBe('function');
});