import axios from "axios";
import { useEffect, useState } from "react";
import ViewOrderInfo from "../components/viewOrderInfo";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!loaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log(response.data);
                    setOrders(response.data);
                    setLoaded(true);
                });
        }
    }, [loaded]);

    return (
        <div className="w-full min-h-screen bg-gradient-to-r from-[#0a0f1d] via-[#070b16] to-[#050811] text-white flex flex-col items-center py-12 px-4 md:px-8 relative overflow-hidden">
            
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none z-0" />

            <div className="relative z-10 w-full max-w-7xl">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                        Your <span className="text-cyan-500">Orders</span>
                    </h1>
                    <p className="text-sm text-slate-400 mt-2">
                        Manage and track the status of your computer hardware purchases.
                    </p>
                </div>

                {loaded ? (
                    <div className="w-full bg-[#0d1527]/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#0a0f1d]/80 border-b border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider">
                                        <th className="py-4 px-6">Order ID</th>
                                        <th className="py-4 px-6">Customer email</th>
                                        <th className="py-4 px-6">Customer name</th>
                                        <th className="py-4 px-6">Date</th>
                                        <th className="py-4 px-6">Status</th>
                                        <th className="py-4 px-6">Total Amount</th>
                                        <th className="py-4 px-6">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                                    {orders.map((order, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="hover:bg-white/[0.02] transition-colors duration-150"
                                            >
                                                <td className="py-4 px-6 font-mono font-bold text-cyan-400">
                                                    {order.orderId}
                                                </td>
                                                <td className="py-4 px-6 text-slate-400">
                                                    {order.email}
                                                </td>
                                                <td className="py-4 px-6 font-medium text-slate-200">
                                                    {order.name}
                                                </td>
                                                <td className="py-4 px-6 text-slate-400">
                                                    {new Date(order.date).toLocaleDateString()}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                                        order.status === "pending" 
                                                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                                                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                                                            order.status === "pending" ? "bg-amber-400" : "bg-emerald-400"
                                                        }`} />
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 font-bold text-slate-100">
                                                    LKR. {order.total.toFixed(2)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <ViewOrderInfoCustomer order={order} />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[50vh] w-full">
                        <Loader />
                    </div>
                )}

            </div>
        </div>
    );
}

// import axios from "axios";
// import { useEffect, useState } from "react";
// import ViewOrderInfo from "../components/viewOrderInfo";
// import Loader from "../components/loader";
// import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

// export default function OrdersPage() {
// 	const [orders, setOrders] = useState([]);
// 	const [loaded, setLoaded] = useState(false);

// 	useEffect(() => {
//         const token = localStorage.getItem("token");
// 		if (!loaded) {
// 			axios
// 				.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 })
// 				.then((response) => {
// 					console.log(response.data);
// 					setOrders(response.data);
// 					setLoaded(true);
// 				});
// 		}
// 	}, [loaded]);

// 	return (
// 		<div
// 			className="w-full flex justify-center p-10 relative
//       bg-gradient-to-b from-primary to-white text-secondary"
// 		>
// 			{loaded ? (
// 				<table
// 					className="w-full max-w-7xl table-auto border-separate border-spacing-0
//         rounded-2xl overflow-hidden shadow-xl bg-white/70 
//         "
// 				>
// 					<thead className="sticky top-0 ">
// 						<tr className="bg-secondary text-primary/95">
// 							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
// 								Order ID
// 							</th>
//                             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Customer email
// 							</th>
//                             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Customer name
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Date
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Status
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Total Amount
//                             </th>
//                             <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
//                                 Actions
//                             </th>
// 						</tr>
// 					</thead>

// 					<tbody className="divide-y divide-secondary/10">
// 						{orders.map((order, index) => {
// 							return (
// 								<tr
// 									key={index}
// 									className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition-colors"
// 								>
								
// 									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
// 										{order.orderId}
// 									</td>
//                                     <td className="px-4 py-3 text-sm font-medium text-secondary/90">
//                                         {order.email}
//                                     </td>
//                                     <td className="px-4 py-3 text-sm font-medium text-secondary/90">
//                                         {order.name}
//                                     </td>
//                                     <td className="px-4 py-3 text-sm font-medium text-secondary/90">
//                                         {new Date(order.date).toLocaleDateString()}
//                                     </td>
//                                     <td className="px-4 py-3 text-sm font-medium text-secondary/90">
//                                         {order.status}
//                                     </td>
//                                     <td className="px-4 py-3 text-sm font-medium text-secondary/90">
//                                         LKR. {order.total.toFixed(2)}
//                                     </td>
//                                     <td className="px-4 py-3 text-sm font-medium text-secondary/90">
// 										<ViewOrderInfoCustomer order={order} />
//                                     </td>
									
// 								</tr>
// 							);
// 						})}
// 					</tbody>
// 				</table>
// 			) : (
// 				<Loader />
// 			)}

// 		</div>
// 	);
// }
