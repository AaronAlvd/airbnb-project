import { useState } from "react";
import { useDispatch } from "react-redux";
import * as bookingActions from "../../store/booking";

export default function BookingForm({ props }) {
    const dispatch = useDispatch();
    const { id } = props;

    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        // Validate dates
        if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            setError("End date must be after start date.");
            return;
        }

        setLoading(true); // Set loading state

        try {
            console.log("Form submitted with data:", formData);
            await dispatch(bookingActions.createBooking(id, formData));
            console.log("Booking dispatched successfully!");

            // Clear form fields after successful submission
            setFormData({ startDate: "", endDate: "" });
        } catch (err) {
            console.error("Error creating booking:", err);
            setError(err.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Start Date:
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    End Date:
                    <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Creating Booking..." : "Create Booking"}
            </button>
        </form>
    );
}
