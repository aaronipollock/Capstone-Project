// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// function CreateNotebook() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [title, setTitle] = useState('');
//     const [errors, setErrors] = useState({});

//     const notebooks = useSelector((state) => state.notebooks.notebooks)
//     const user = useSelector((state) => state.session.user);

//     // let existingTitle;

//     const validateForm = () => {
//         const newErrors = {};
//         if (!title || title.length > 50) newErrors.title = "Title must be between 1 and 50 characters."
//         return newErrors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newErrors = validateForm();
//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         const titleData = {
//             title,
//         }

//         try {
//             const titleRes = await fetch('/api/notebooks/create', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(titleData)
//             })

//             if (titleRes.ok) {
//                 navigate('/notebooks');
//             } else {
//                 const errorData = await reviewRes.json();
//                 setErrors({ apiError: errorData.message || "An error occurred" })
//             }
//         } catch (err) {
//             console.error('Request Error:', err);
//             setErrors({ apiError: "An error occurred" });
//         }
//     };

//     return
// }

// export default CreateNotebook;
