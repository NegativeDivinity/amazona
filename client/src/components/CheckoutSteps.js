import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutSteps( props ) {
    return (
        <div className = 'row checkout-steps'>
            <Link to = '/signin'><div className = {props.step1 ? 'active': ''}>Sign-In</div></Link>
            <Link to = '/shipping'><div className = {props.step2 ? 'active': ''}>Shipping</div></Link>
            <Link to = '/payment'><div className = {props.step3 ? 'active': ''}>Payment</div></Link>
            <Link to = '/placeorder'><div className = {props.step4 ? 'active': ''}>Place Order</div></Link>
        </div>
    )
}

export default CheckoutSteps

