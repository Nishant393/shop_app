import { useState } from "react";
import { useUserContext } from "../Provider/AuthContext";

const AddressForm = ({ address, onSubmit, onCancel }) => {

    const {user} = useUserContext()
    const [formData, setFormData] = useState({
        phoneNumber:user?.mobileNumber || '',
        street: address?.street || '',
        city: address?.city || '',
        state: address?.state || '',
        postalCode: address?.postalCode || '',
        type: address?.type || 'home',
        country:"india",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formData",formData)
        onSubmit(formData);
        setFormData({ street: '', city: '', state: '', postalCode: '', type: 'home' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Street Address</label>
                    <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">City</label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">State</label>
                    <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">postalCode</label>
                    <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Address Type</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
                    >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                    {address ? 'Update Address' : 'Add Address'}
                </button>
            </div>
        </form>
    );
};

export default AddressForm;