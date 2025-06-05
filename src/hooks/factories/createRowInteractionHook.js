import { useState, useCallback } from 'react';

// quan ly trang thai tuong tac 1 hang: highlighted, selected
export const createRowInteractionHook = (initialStateKey = null) => {
  return () => {
    const [selectedRowId, setSelectedRowId] = useState(initialStateKey);

    const handleRowClick = useCallback((rowId) => {
      setSelectedRowId(prevId => (prevId === rowId ? null : rowId)); // Toggle select
    }, []);

    const isRowSelected = useCallback((rowId) => {
      return selectedRowId === rowId;
    }, [selectedRowId]);

    const resetSelection = useCallback(() => {
      setSelectedRowId(null);
    }, []);

    return {
      selectedRowId,
      handleRowClick,
      isRowSelected,
      resetSelection,
    };
  };
};