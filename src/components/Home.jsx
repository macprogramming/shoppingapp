import React, { useEffect, useState }  from "react";
import Header from "./static/Header";
import HomeBanner from "./HomeBanner";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addCaseProduct } from '../redux/slice/products';
import { AiFillStar, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineEye, AiFillAppstore, AiOutlineUnorderedList, AiOutlineSearch, AiFillCheckCircle } from 'react-icons/ai';
import { RotatingTriangles } from 'react-loader-spinner';
import ProducstDetails from "./ProductsDetails";
import { addProduct } from "../redux/slice/cartDataSlice";
import Modal from 'react-bootstrap/Modal';
import ProductList from "./ProductList";
const Home = () => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    category: '',
    description: '',
    id: null,
    image : '',
    price : null,
    rating : {rate: null, count: null},
    title : ''
  });
  const [productRaings, setProductsRatings] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isChangeview, setIschangeView] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [dollerPrice, setDollerPrice] = useState(74);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // const state = allProducts !== undefined ? allProducts : useSelector((state) => state);
  const cartData = useSelector((state) => {
    return state.cartData;
  });

  // let filterCategory = [];
  // if(state.products.data !== null) {
  //   state.products.data.map((data) => {
  //     filterCategory.push(data.category);
  //   })
  // }

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  
  const handleClose = () => {
    setOpen(false)
  }

  return(
    <>
      {
        !state.products.isLoading ? 
        <>
          <Header />
          <HomeBanner />
          <div className="container-fluid">
            <div className="row mt-4 px-md-5">
              <ProductList
                products = {state.products.data}
              />
            </div>
          </div>
          <ProducstDetails
            handleClose={handleClose}
            productData={productData}
            productRaings={productRaings}
            open={open}
           />
        </> : 
          <div className="mh-100 wh-100 position-relative">
            <div className="postion-absolute d-grid align-items-center justify-content-center mh-100" style={{ height: '100vh' }}>
              <RotatingTriangles
                visible={true}
                height="100"
                width="100"
                ariaLabel="rotating-triangels-loading"
                wrapperStyle={{}}
                wrapperClass="rotating-triangels-wrapper"
              />
            </div>
          </div>
      }
    </>
  )
}

export default Home;
