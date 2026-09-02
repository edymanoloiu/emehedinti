import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { slugify } from "../../utils";
import { getPostHref } from "../../../lib/postHref";

const SliderTwo = ({ slidePost }) => {
    const posts = slidePost.slice(0, 3);

    const [contentApi, contentRef] = useEmblaCarousel({ loop: true });
    const [imageApi, imageRef] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [shape, setShape] = useState("");

    useEffect(() => {
        setShape("shape-loaded");
    }, []);

    const onSelect = useCallback(() => {
        if (!contentApi || !imageApi) return;
        const idx = contentApi.selectedScrollSnap();
        setSelectedIndex(idx);
        imageApi.scrollTo(idx);
    }, [contentApi, imageApi]);

    useEffect(() => {
        if (!contentApi) return;
        contentApi.on("select", onSelect);
        return () => contentApi.off("select", onSelect);
    }, [contentApi, onSelect]);

    const scrollTo = useCallback((index) => {
        contentApi?.scrollTo(index);
        imageApi?.scrollTo(index);
    }, [contentApi, imageApi]);

    const scrollPrev = useCallback(() => {
        contentApi?.scrollPrev();
        imageApi?.scrollPrev();
    }, [contentApi, imageApi]);

    const scrollNext = useCallback(() => {
        contentApi?.scrollNext();
        imageApi?.scrollNext();
    }, [contentApi, imageApi]);

    const ShareToggler = (e) => {
        const targeElm = e.target.nextElementSibling;
        targeElm.classList.toggle("show-shares");
    };

    return (
        <div className="banner banner__home-with-slider banner__home-with-slider-two grad-bg">
            <div className={`axil-shape-circle ${shape}`} />
            <div className={`axil-shape-circle__two ${shape}`} />
            <div className="container">
                <div className="row">
                    <div className="col-xl-5">
                        <div className="banner-slider-container banner-slider-container-two">
                            <div className="slick-slider slick-slider-for embla" ref={contentRef} style={{ overflow: "hidden" }}>
                                <div className="embla__container" style={{ display: "flex" }}>
                                    {posts.map((data) => (
                                        <div className="embla__slide item" key={data.slug} style={{ flex: "0 0 100%", minWidth: 0 }}>
                                            <div className="post-metas home-banner-post-metas m-b-xs-20">
                                                <ul className="list-inline">
                                                    <li className="m-r-xs-20">
                                                        <Link href={`/autor/${slugify(data.author_name)}`} className="d-flex align-items-center">
                                                                <Image src={data.author_img} alt={data.author_name} width={50} height={50} />
                                                                <span className="m-l-xs-20">{data.author_name}</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <h1 className="page-title m-b-xs-40 hover-line">
                                                <Link href={getPostHref(data)}>{data.title}</Link>
                                            </h1>
                                            <div className="btn-group">
                                                <Link href={getPostHref(data)} className="btn btn-primary m-r-xs-30">READ MORE</Link>
                                                <Link href={`/categorie/${slugify(data.cate)}`} className="btn-link">ALL CURRENT NEWS</Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Dots */}
                            <div className="slick-dots" style={{ display: "flex", listStyle: "none", justifyContent: "center", gap: 6, padding: 0, marginTop: 12 }}>
                                {posts.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => scrollTo(idx)}
                                        style={{
                                            width: 10, height: 10, borderRadius: "50%", border: "none", padding: 0, cursor: "pointer",
                                            background: idx === selectedIndex ? "#fff" : "rgba(255,255,255,0.4)",
                                        }}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="banner-slider-container-synced banner-slider-container-synced__two">
                    <div className="slick-slider slick-slider-nav embla" ref={imageRef} style={{ overflow: "hidden" }}>
                        <div className="embla__container" style={{ display: "flex" }}>
                            {posts.map((data) => (
                                <div className="embla__slide item" key={data.slug} style={{ flex: "0 0 50%", minWidth: 0 }}>
                                    <Image src={data.featureImg} alt={data.title} width={495} height={550} unoptimized />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="slick-prev slick-arrow" onClick={scrollPrev} aria-label="Previous slide">
                        <i className="feather icon-chevron-left"></i>
                    </button>
                    <button className="slick-next slick-arrow" onClick={scrollNext} aria-label="Next slide">
                        <i className="feather icon-chevron-right"></i>
                    </button>
                </div>

                <div className="banner-share-slider-container banner-share-slider-container__two">
                    <div className="banner-share-slider">
                        <div className="item">
                            <div className="banner-shares slick-banner-shares">
                                <div className="toggle-shares" onClick={ShareToggler}>
                                    Shares <span>+</span>
                                </div>
                                <div className="social-share-wrapper">
                                    <ul className="social-share social-share__with-bg">
                                        <li>
                                            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://new.axilthemes.com/post/${posts[selectedIndex]?.slug}`}>
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li><a href="#"><i className="fa-brands fa-x-twitter" /></a></li>
                                        <li><a href="#"><i className="fab fa-behance" /></a></li>
                                        <li><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderTwo;
