import React, {useEffect, useState} from "react";
import { AiFillStar, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineEye, AiFillAppstore, AiOutlineUnorderedList, AiOutlineSearch,
  AiFillCheckCircle, AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addCaseProduct } from '../redux/slice/products';
import { addProduct } from "../redux/slice/cartDataSlice";
import Modal from 'react-bootstrap/Modal';
import ProducstDetails from "./ProductsDetails";
import { dropdownFilterArr } from "./static/constant";

const ProductList = ({products}) => {

  const [isLoader, setIsLoader] = useState(false);
  const [isChangeview, setIschangeView] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [mainProductData, setMainProductData] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [dollerPrice, setDollerPrice] = useState(74);
  const [open, setOpen] = useState(false);
  let [checkBadge, setCheckBadge] = useState(['all']);
  let [dropdownFilter, setDropdownFilter] = useState(dropdownFilterArr);
  let [dropdownFilterText, setDropdownFilterText] = useState('Sort by Default');
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
  const [isFilter, setIsFilter] = useState(false);
  let [searchText, setSearchText] = useState('')

  useEffect(() => {
    setAllProducts(products);
    setMainProductData(products);
  }, [])
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // const state = allProducts !== undefined ? allProducts : useSelector((state) => state);
  const cartData = useSelector((state) => {
    return state.cartData;
  });
  let filterCategory = [];
  if(mainProductData !== null) {
    mainProductData.map((data) => {
      filterCategory.push(data.category);
    })
  }
  const sortBy = (val, text) => {
    let arrVal = checkBadge;
    if(val === 'priceLow') {
      let filterData = allProducts.slice().sort((a,b) => {
        let priceA = Math.round(a.price)
        let priceB = Math.round(b.price)
        return priceA - priceB
      })
      setAllProducts(filterData)
      // dispatch(addCaseProduct(filterData))
    }
    if(val === 'priceHigh') {
      let filterData = allProducts.slice().sort((a,b) => {
        let priceA = Math.round(a.price)
        let priceB = Math.round(b.price)
        return priceB - priceA
      })
      setAllProducts(filterData)
      // dispatch(addCaseProduct(filterData))
    }
    if(val === 'ratingsLow') {
      let filterData = allProducts.slice().sort((a,b) => {
        let ratingA = Math.round(a.rating.rate)
        let ratingB = Math.round(b.rating.rate)
        return ratingA - ratingB
      })
      setAllProducts(filterData)
      // dispatch(addCaseProduct(filterData))
    }
    if(val === 'ratingsHigh') {
      let filterData = allProducts.slice().sort((a,b) => {
        let ratingA = Math.round(a.rating.rate)
        let ratingB = Math.round(b.rating.rate)
        return ratingB - ratingA
      })
      setAllProducts(filterData)
      // dispatch(addCaseProduct(filterData))
    }
    setDropdownFilterText(text)
    arrVal[1] = text;
    setCheckBadge(arrVal)
    // setCheckBadge(val)
  }
  const addToCart = (data) => {
    setIsAdd(true)
    setInterval(() => {
      setIsAdd(false)
    }, 3000)
    dispatch(addProduct(data));
  }
  const changeDisplayFormat = (val) => {
    if(val === 'listView') {
      setIschangeView(true)
    }
    if(val === 'tableView') {
      setIschangeView(false)
    }
  }
  const showProductDetails = (data) => {
    setOpen(true)
    setProductData(data)
    setProductData({
      category: data.category,
      description: data.description,
      id: data.id,
      image : data.image,
      price : data.price,
      rating : {rate: data.rating.rate, count: data.rating.count},
      title : data.title
    });
    let rating = Math.round(data.rating.rate);
    let ratingStars = [];
    for(let i=0; i < rating; i++){
      ratingStars.push(i)
    }
    setProductsRatings(ratingStars)
  }
  const sortCategoryData = (val) => {
    let arrVal = checkBadge;
    let filterData;
    if(val !== 'all') {
      filterData = mainProductData.filter((i,n) => {
        return i.category === val;
      });
    } else {
      filterData = mainProductData
    }
    arrVal[0] = val;
    setCheckBadge(arrVal)
    setAllProducts(filterData)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const clearFilter = (val,index) => {
    setIsFilter(!isFilter)
    if(checkBadge[index] == val) {
      checkBadge.splice(index, 1);
    }
    setCheckBadge(checkBadge)
    resetData(checkBadge, index)
  }
  const resetData = (badge, index) => {
    console.log(badge)
    console.log(index)
    let badgeArr = ['all']
    if (badge.length === 0) {
      setCheckBadge(badgeArr)
      setAllProducts(mainProductData)
    }
    if(1 === index) {
      setDropdownFilterText('Sort by Default');
    }
  }
  const searchBy = (e) => {
    setSearchText(e.target.value)
    if(e.target.value.length >= 3) {
      let filterData = mainProductData.filter((i,n) => {
        // return ;
        if(i.title.toLowerCase().includes(e.target.value.toLowerCase())){
          return i
        }
      });
      setAllProducts(filterData);
    } else {
      setAllProducts(mainProductData);
    }
  }
  return(
    <>
      <div className="col-md-2">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                Category Filters
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
              <div class="accordion-body">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="exampleRadios" id={`categoruAll`} value="all" onChange={() => {sortCategoryData('all')}} checked={checkBadge.includes('all') ? true : false} />
                  <label class="form-check-label text-capitalize" for="exampleRadios2">
                    All
                  </label>
                </div>
                {
                  [...new Set(filterCategory)].map((category,i) => {
                    return(
                      <>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id={`categoru${i}`} value={category} onChange={() => {sortCategoryData(category)}} checked={checkBadge.includes(category) ? true : false} />
                        <label class="form-check-label text-capitalize" for="exampleRadios2">
                          {category}
                        </label>
                      </div>
                      </>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-10">
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <p className="m-0 text-secondary h5">Showing {allProducts !== null && allProducts.length} results</p>
              <div className="input-group mb-3 w-25">
                <input type="text" className="form-control" placeholder="Search by" value={searchText} onChange={(e) => searchBy(e)} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                {/* <button className="btn btn-outline-secondary" type="button" id="button-addon1"><AiOutlineSearch /></button> */}
              </div>
              <div className="dropdown">
                <button className="btn btn-outline-custom-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  {dropdownFilterText}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {
                    dropdownFilter.map((dropdown) => {
                      return(
                        <li><a className="dropdown-item" href="javascript:void(0)" onClick={ () => sortBy(dropdown.value, dropdown.name) } >{dropdown.name}</a></li>
                      )
                    })
                  }
                  {/* <li><a className="dropdown-item" href="javascript:void(0)" onClick={ () => sortBy('priceLow', 'Price Low to High') } >Price Low to High</a></li>
                  <li><a className="dropdown-item" href="javascript:void(0)" onClick={ () => sortBy('priceHigh', 'Price High to Low') } >Price High to Low</a></li>
                  <li><a className="dropdown-item" href="javascript:void(0)" onClick={ () => sortBy('ratingsLow', 'Rating Low to High') } >Sort by rating Low to High</a></li>
                  <li><a className="dropdown-item" href="javascript:void(0)" onClick={ () => sortBy('ratingsHigh', 'Rating High to Low') } >Sort by rating High to Low</a></li> */}
                </ul>
              </div>
              <div>
                <button type="button" className={!isChangeview ? 'btn btn-sm btn-custom-primary' : 'btn btn-sm btn-outline-custom-primary'} id="tableView" onClick={ (e) => {changeDisplayFormat(e.target.id)}}>
                  <AiFillAppstore fontSize={'26px'} /></button>
                &nbsp;&nbsp;
                <button type="button" className={isChangeview ? 'btn btn-sm btn-custom-primary' : 'btn btn-sm btn-outline-custom-primary'} id="listView" onClick={ (e) => changeDisplayFormat(e.target.id) }>
                  <AiOutlineUnorderedList fontSize={'26px'} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            {
              checkBadge.map((badge, i) => {
                return(
                  <>
                  <span key={i} class="badge rounded-pill bg-primary text-capitalize">{badge}&nbsp;<a href="javascript:void(0)" className="text-white fw-bold" onClick={ (e) => {clearFilter(badge,i)}}><AiOutlineClose /></a></span>&nbsp;
                  </>
                )
              })
            }
          </div>
        </div>
        <div className="row">
          {
            allProducts !== null &&
            allProducts.map((product, key) => {
              let rating = Math.round(product.rating.rate);
              let ratingStars = [];
              for(let i=0; i < rating; i++){
                ratingStars.push(i)
              }
              let dollars = parseInt(product.price);
              var rupees = dollars * dollerPrice;
              return(
                <>
                  {
                    !isChangeview ?
                    <div className="col-md-3 mh-100 mb-4" key={key}>
                      <div className="card h-100">
                        <div className="card-body">
                          <img src={product.image} style={{ height: '150px' }} className="img img-fluid text-center mb-3 align-items-center mx-auto d-flex justify-content-center" />
                          <p className="card-title m-0 text-secondary">{product.category}</p>
                          <h6 className="card-title">{product.title}</h6>
                          <h6 className="card-title">&#8377;&nbsp;{rupees}</h6>
                        </div>
                        <div className="card-footer bg-white border-0">
                          {ratingStars.map((rate, i) => {
                              return(
                                <AiFillStar key={i} fontSize={'18px'} color="yellow" />
                              )
                            })}
                            <div className="d-flex my-3 justify-content-between">
                              <button type="button" className={cartData.length >= 10 ? 'btn btn-outline-primary disabled' : 'btn btn-outline-primary'} onClick={ () => addToCart(product)}><AiOutlineShoppingCart />&nbsp;Add To Cart</button>
                              <button type="button" className="btn btn-outline-custom-primary"><AiOutlineHeart /></button>
                              <button type="button" className="btn btn-outline-success" onClick={() => showProductDetails(product)}><AiOutlineEye /></button>
                            </div>
                        </div>
                      </div>
                    </div> : 
                    <div className="col-12 mb-4" key={key}>
                      <div className="card mb-3" >
                        <div className="card-body">
                          <div className="row g-0">
                            <div className="col-md-3">
                              <img src={product.image} style={{ height: '200px' }} className="img-fluid rounded-start d-flex justify-content-center align-items-center" alt="..." />
                            </div>
                            <div className="col-md-9">
                              <div className="card-body">
                                <p className="card-title m-0 text-secondary">{product.category}</p>
                                <h6 className="card-title">{product.title}</h6>
                                <h6 className="card-title">&#8377;&nbsp;{rupees}</h6>
                                <p className="card-title text-secondary">{product.description}</p>
                                {ratingStars.map((rate, i) => {
                                  return(
                                    <AiFillStar key={i} fontSize={'18px'} color="yellow" />
                                  )
                                })}
                              </div>
                              <div className="card-footer bg-white border-0">
                                <div className="d-flex my-3">
                                    <button type="button" className={cartData.length >= 10 ? 'btn btn-outline-primary disabled' : 'btn btn-outline-primary'}><AiOutlineShoppingCart />&nbsp;Add To Cart</button>&nbsp;&nbsp;
                                    <button type="button" className="btn btn-outline-custom-primary"><AiOutlineHeart /></button>&nbsp;&nbsp;
                                    <button type="button" className="btn btn-outline-success" onClick={() => showProductDetails(product)}><AiOutlineEye /></button>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </>
              )
            })
          }
        </div>
      </div>
      <ProducstDetails
        handleClose={handleClose}
        productData={productData}
        productRaings={productRaings}
        open={open}
      />
      <Modal
        show={isAdd}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="text-center">
            <AiFillCheckCircle fontSize={'40px'} color="green" />
            <p className="text-center my-2">Product has been added to your cart</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProductList;