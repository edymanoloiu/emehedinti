import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { slugify } from "../../utils";

const WidgetCategory = ({ cateData }) => {
    const categories = cateData.map((data) => ({
        name: data.cate,
        thumb: data.cate_img,
    }));

    const category = categories.reduce((prev, curr) => {
        prev[curr.name] = (prev[curr.name] || 0) + 1;
        return prev;
    }, {});

    const cateList = Object.keys(category).map((cateTitle) => {
        const imgGet = categories.filter((post) => post.name === cateTitle);
        return {
            name: cateTitle,
            slug: slugify(cateTitle),
            count: category[cateTitle],
            cateImg: imgGet[0].thumb,
        };
    });

    const pages = [
        cateList.slice(0, 4),
        cateList.slice(5, 9),
        cateList.slice(10, 14),
    ];

    const [emblaApi, emblaRef] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <div className="category-widget m-b-xs-40">
            <div className="widget-title">
                <h3>Categories</h3>
                <div className="owl-nav">
                    <button className="custom-owl-prev" onClick={scrollPrev}>
                        <i className="feather icon-chevron-left" />
                    </button>
                    <button className="custom-owl-next" onClick={scrollNext}>
                        <i className="feather icon-chevron-right" />
                    </button>
                </div>
            </div>
            <div className="category-carousel">
                <div className="embla" ref={emblaRef} style={{ overflow: "hidden" }}>
                    <div className="embla__container" style={{ display: "flex" }}>
                        {pages.map((page, pageIdx) => (
                            <div
                                key={pageIdx}
                                className="embla__slide cat-carousel-inner"
                                style={{ flex: "0 0 100%", minWidth: 0 }}
                            >
                                <ul className="category-list-wrapper">
                                    {page.map((data) => (
                                        <li className="category-list perfect-square" key={data.slug}>
                                            <Link href={`/categorie/${data.slug}`} className="list-inner">
                                                    <Image
                                                        src={data.cateImg}
                                                        alt={data.name}
                                                        width={155}
                                                        height={190}
                                                    />
                                                    <div className="post-info-wrapper overlay">
                                                        <div className="counter-inner">
                                                            <span className="counter">{data.count}</span>+
                                                        </div>
                                                        <h4 className="cat-title">{data.name}</h4>
                                                    </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidgetCategory;
