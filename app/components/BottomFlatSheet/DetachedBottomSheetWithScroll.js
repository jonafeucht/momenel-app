import { Dimensions } from "react-native";
import { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBoundStore } from "../../Store/useBoundStore";

const DetachedBottomSheetWithScroll = (props) => {
  const mode = useBoundStore((state) => state.mode);
  let { show, onSheetClose } = props;
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    if (show === true) {
      bottomSheetRef?.current?.expand();
    } else {
      bottomSheetRef?.current?.close();
    }
  }, [show]);

  const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
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
          bottomInset={insets.bottom + 10}
          detached={true}
          style={{
            marginHorizontal: "3%",
          }}
          keyboardBlurBehavior="restore"
          backgroundStyle={{
            backgroundColor: mode === "dark" ? "#2C2C2C" : "#ffffff",
          }}
          handleIndicatorStyle={{
            backgroundColor: mode === "dark" ? "#464646" : "#828282",
          }}
        >
          <BottomSheetScrollView
            onLayout={handleContentLayout}
            style={{ maxHeight: Dimensions.get("window").height * 0.8 }}
          >
            {props.children}
          </BottomSheetScrollView>
        </BottomSheet>
      </Portal>
    </>
  );
};

export default DetachedBottomSheetWithScroll;
