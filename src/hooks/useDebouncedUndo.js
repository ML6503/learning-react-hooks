import { useState, useEffect, useCallback } from 'react';
import useUndo from 'use-undo';
import { useDebouncedCallback } from 'use-debounce';

export default function useDebouncedUndo(timeout = 200) {
    const [ content, setInput ] = useState('');
  
    const [ undoContent, {
      set: setContent, ...undoRest }] = useUndo('');
  
    const debounced = useDebouncedCallback(
      (value) => setContent(value),
      timeout
    );

    useEffect(() => {
        debounced.cancel();
        setInput(undoContent.present);
      }, [undoContent, debounced]);

    const setter = useCallback(function setterFn(value) {
        setInput(value);
        debounced.callback(value);
        
    }, [setInput, debounced]);

    return [ content, setter, undoRest ];
};
