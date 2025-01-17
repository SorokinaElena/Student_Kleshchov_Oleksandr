import styles from "./styles.module.css";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./styles.css";

import { FreeMode, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sale = () => {
  const { list } = useSelector(({ products }) => products);

  let discont = list.filter((el) => {
    return el.discont_price !== null;
  });

  let discontMax = discont.filter((el, ind) => {
    return ind < 10;
  });

  const TwoStyles = `${styles.block__list} "mySwiper"`;

  const breakpoints = () => {
    return {
      1400: {
        slidesPerView: 4,
        spaceBetween: 29,
      },
      1200: {
        slidesPerView: 3.5,
        spaceBetween: 0,
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      830: {
        slidesPerView: 2.5,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 1.9,
        spaceBetween: 0,
      },
      490: {
        slidesPerView: 1.4,
        spaceBetween: 0,
      },
    };
  };

  return (
    <div className={styles.sale}>
      <div className={styles.block__sale}>
        <Swiper
          slidesPerView={1}
          spaceBetween={29}
          breakpoints={breakpoints()}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className={TwoStyles}
        >
          {discontMax.map((el, ind) => (
            <SwiperSlide className={styles.block__list_link} key={ind}>
              <Link
                className={styles.no__active}
                key={ind}
                to={`/CartProduct/${el.id}`}
              >
                <div className={styles.block__border}>
                  <p className={styles.block__list_discont}>
                    {Math.round((el.discont_price / el.price) * 100 - 100) +
                      "%"}
                  </p>
                  <img alt="#" src={"http://localhost:3333" + el.image} />
                  <div className={styles.block__list_info}>
                    <p className={styles.block__list_title}>{el.title}</p>
                    <div className={styles.block__list_price}>
                      <p className={styles.block__list_price_new}>
                        {"$" + el.discont_price}
                      </p>
                      <p className={styles.block__list_price_old}>
                        {"$" + el.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Sale;
