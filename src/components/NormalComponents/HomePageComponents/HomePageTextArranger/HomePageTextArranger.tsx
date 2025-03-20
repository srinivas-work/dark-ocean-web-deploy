import { useEffect, useState } from "react";
import { useHomepageScrollOffset } from "../../../../../store/useHomepageScroll";
import { homepageData } from "../../../utils/data/dataHolder";
import HomePageText from "./HomePageText/HomePageText";
import useIsPhoneScreen from "../../../utils/hooks/useIsPhoneScreen";

const HomePageTextArranger = () => {
  const scrollOffset = useHomepageScrollOffset();
  const isPhoneScreen = useIsPhoneScreen();
  const [visibleTextIndex, setVisibleTextIndex] = useState(-1);

  useEffect(() => {
    //......Space Text
    if (scrollOffset >= 0.04 && scrollOffset <= 0.13) {
      setVisibleTextIndex(0);
    } else if (scrollOffset >= 0.17 && scrollOffset <= 0.25) {
      setVisibleTextIndex(1);

      //....Ocean Text
    } else if (scrollOffset > 0.252 && scrollOffset <= 0.32) {
      setVisibleTextIndex(2);
    }

    //....Underwater Text
    else if (scrollOffset >= 0.33 && scrollOffset <= 0.38) {
      setVisibleTextIndex(3);
    } else if (scrollOffset >= 0.42 && scrollOffset <= 0.49) {
      setVisibleTextIndex(4);
    } else if (scrollOffset >= 0.52 && scrollOffset <= 0.62) {
      setVisibleTextIndex(5);
    } else if (scrollOffset > 0.62 && scrollOffset <= 0.686) {
      setVisibleTextIndex(6);
    }

    //.....Underearth Scroll Text
    else if (scrollOffset >= 0.69 && scrollOffset <= 0.75) {
      setVisibleTextIndex(7);
    } else if (scrollOffset > 0.75 && scrollOffset <= 0.81) {
      setVisibleTextIndex(8);
    } else if (scrollOffset > 0.81 && scrollOffset <= 0.87) {
      setVisibleTextIndex(9);
    } else if (scrollOffset > 0.87 && scrollOffset <= 0.91) {
      setVisibleTextIndex(10);
    } else {
      setVisibleTextIndex(-1);
    }
  }, [scrollOffset]);

  return (
    <div>
      {homepageData.map((homepageDataItem, index) => {
        const getCenterText = (index: number) => {
          if (index >= 7 && isPhoneScreen) {
            return true;
          } else if (index >= 7) {
            return false;
          }
          return index !== 0 && index !== 2 && index !== 3;
        };

        const getMakeDarkText = (index: number) => index === 2;

        const getYPos = (index: number) => {
          if (index === 1 && isPhoneScreen) {
            return -155;
          } else if (index === 0 || index === 1 || index >= 7) {
            return 0;
          }
          return index === 3 || index === 2 ? -155 : -185;
        };

        //const getXPos = (index: number) => (index >= 7 ? 400 : 0);

        const getHeadingTextWidth = (index: number) =>
          index === 4 ? "60%" : undefined;

        return (
          <HomePageText
            isVisible={visibleTextIndex === index}
            subHeading={homepageDataItem.subHeading}
            heading={homepageDataItem.heading}
            desc={homepageDataItem.desc}
            key={index}
            centerText={getCenterText(index)}
            makeDarkText={getMakeDarkText(index)}
            yPos={getYPos(index)}
            addBlurBg={index >= 7}
            {...(index >= 7 && !isPhoneScreen
              ? {
                  style: {
                    marginLeft: "25rem",
                  },
                }
              : {})}
            //xPos={getXPos(index)}
            headingTextWidth={getHeadingTextWidth(index)}
          />
        );
      })}
    </div>
  );
};

export default HomePageTextArranger;

// const getTextElement = () => {
//     let itemIndex = 0;
//     if (scrollOffset < 0.135) {
//       return <></>;
//     } else if (scrollOffset >= 0.135 && scrollOffset <= 0.145) {
//       itemIndex = 0;
//     }
//     // const homepageDataItem = homepageData[itemIndex];

//     // return (
//     //   <HomePageText
//     //     isVisible
//     //     subHeading={homepageDataItem.subHeading}
//     //     heading={homepageDataItem.heading}
//     //     para={homepageDataItem.desc}
//     //     key={homepageDataItem.id}
//     //   />
//     // );
//   };
