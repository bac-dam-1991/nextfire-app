import React, { ReactElement } from "react";

export interface LoaderProps {
	show: boolean;
}

const Loader = ({ show }: LoaderProps): ReactElement => {
	return show ? <div className="loader" /> : null;
};

export default Loader;
