import { useBlogItem } from "../../../../store/useBlogItem";
import AnimatedText from "../../../components/UI/AnimatedText/AnimatedText";
import SocialMediaIconSet from "../../../components/UI/SocialMediaIconSet/SocialMediaIconSet";
import styles from "./BlogPage.module.css";

const BlogPage = () => {
  const { chosenBlogItem } = useBlogItem();

  return (
    <div className={styles.blogContainer}>
      <AnimatedText
        el="h1"
        text={chosenBlogItem?.title ? chosenBlogItem.title : ""}
        blockAnimation
      />
      <div className={styles["blog-item-details"]}>
        <p>{chosenBlogItem?.postDate}</p>
        <span />
        <p>{chosenBlogItem?.category}</p>
        <span />
        <p>Dark Ocean</p>
      </div>
      <div className={styles.hero}>
        <img
          src="/img/sustainability/pic1.jpg"
          alt="ROV Equipment"
          className={styles.heroImage}
        />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles["content-container"]}>
        <div className={styles.content}>
          <p>
            We are pleased to announce that Darkocean has taken delivery of two
            Heavy Work Class Triton XLS ROVs, now stationed at our Doha, Qatar
            base. This strategic enhancement of our fleet is designed to elevate
            our support for the Energy and EPC sectors across the region.
          </p>
        </div>
        <div className={styles["quote-container"]}>
          <h2>How can I control my budget?</h2>
          <div className={styles.quoteSection}>
            <blockquote>
              Hustle and Cashflow is a BlogPage that aims to educate millennials
              on personal finance. What allows to differ from other personal
              finance blogs, is how we chose to communicate bersonal finance and
              money to millennials using humour and relatable language while
              providing quality information about how to deal with money and
              sharing stories of young people overcoming their financial
              struggle
            </blockquote>
            <cite>PHILIP REYES</cite>
          </div>
        </div>

        <div className={styles.features}>
          <h2>Key Features of Triton XLS ROVs:</h2>
          <ul>
            <li>
              🔹Enhanced Operational Capabilities: Engineered for
              high-performance tasks in challenging underwater environments.
            </li>
            <li>
              🔹Unmatched Reliability: Built to deliver consistent and reliable
              results, even in the most demanding conditions.
            </li>
            <li>
              🔹Advanced Technology: Equipped with the latest innovations for
              superior data acquisition and operational control.
            </li>
          </ul>
        </div>

        <div className={styles["bottom-container"]}>
          <div className={styles.tags}>
            <span>Tags:</span> <span className={styles.tag}>Energy</span>{" "}
            <span className={styles.tag}>Travel</span>
          </div>

          <div className={styles.shareSection}>
            <span>Share On:</span>
            <SocialMediaIconSet invert />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
