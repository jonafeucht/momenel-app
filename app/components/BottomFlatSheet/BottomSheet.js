import React, { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useBoundStore } from "../../Store/useBoundStore";

const BottomFlatSheet = (props) => {
  let { show, onSheetClose } = props;
  const bottomSheetRef = useRef(null);
  const mode = useBoundStore((state) => state.mode);

  useEffect(() => {
    if (show === true) {
      bottomSheetRef?.current?.expand();
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [show]);

  const initialSnapPoints = useMemo(
    () => ["CONTENT_HEIGHT"],
    ["CONTENT_HEIGHT"]
  );
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onSheetClose();
    }
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={mode === "dark" ? 0.7 : 0.5}
      />
    ),
    []
  );

  return (
    <>
      <Portal>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={animatedSnapPoints}
          handleHeight={animatedHandleHeight}
          contentHeight={animatedContentHeight}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            backgroundColor: mode === "dark" ? "#1A1A1A" : "#ffffff",
          }}
          handleStyle={{
            backgroundColor: mode === "dark" ? "#1A1A1A" : "white",
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
          }}
          handleIndicatorStyle={{
            backgroundColor: mode === "dark" ? "#333333" : "#828282",
          }}
        >
          <BottomSheetView onLayout={handleContentLayout}>
            {props.children}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </>
  );
};

export default BottomFlatSheet;
