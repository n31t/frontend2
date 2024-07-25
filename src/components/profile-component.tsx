"use client"
import React, { useState, useEffect } from 'react';
import axiosInstance from './utils/axiosInstance';

interface User {
  id: number;
  email: string;
  username: string | null;
  phoneNumber: string | null;
  name: string | null;
  surname: string | null;
  age: number | null;
  smallDescription: string | null;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const [dots, setDots] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
      }, 500); // Change dots every 500ms
    
      return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axiosInstance.post('userId-by-token', { token });
            const id = response.data.id;
            const { data } = await axiosInstance.get<User>(`/users/${id}`);
            setUser(data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (user) {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                throw new Error('No token found');
            }
            const response = await axiosInstance.post('userId-by-token', { token });
            const id = response.data.id;
            await axiosInstance.put(`/users/${id}`, user);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user info:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            // <div style={{
            //   display: 'flex',
            //   alignItems: 'center',
            //   justifyContent: 'center',
            //   height: '100vh',
            //   fontSize: '24px',
            //   fontWeight: 600,
            //   color: '#FF7024',
            // }}>
            //   Loading...
            // </div>
            <div id="apartamentsList" className="mt-10 mx-auto">
               <div className="loader mx-auto mt-40"></div>
               <h1 className="text-[#F36202] text-center h-screen">Загрузка{dots}</h1>
            </div>
          );
    }
    if (isSaving) {
        <div id="apartamentsList" className="mt-10 mx-auto">
               <div className="loader mx-auto mt-40"></div>
               <h1 className="text-[#F36202] text-center h-screen">Сохранение{dots}</h1>
            </div>
    }

//   if (!user) return <div className='w-full, h-screen'>Loading...</div>;

  return (
    // <div style={{
    //     width: "100%",
    //     maxWidth: "90%",
    //     margin: "auto",
    //     backgroundColor: "#FDFDFD",
    //     color: "#333",
    //     borderRadius: "0.5rem",
    //     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    //     padding: "0",
    //     marginTop: "1.5rem",
    //     boxSizing: "border-box"
    //   }}>
    //     <div style={{
    //       backgroundColor: "#F18F65",
    //       color: "white",
    //       padding: "1rem 1.5rem",
    //       borderTopLeftRadius: "0.5rem",
    //       borderTopRightRadius: "0.5rem"
    //     }}>
    //       <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Edit Profile</h2>
    //     </div>
    //     <div style={{
    //       padding: "1.5rem",
    //       display: "grid",
    //       gap: "1rem"
    //     }}>
    //       <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr" }}>
    //         <div style={{ display: "grid", gap: "0.5rem" }}>
    //           <label htmlFor="name" style={{ fontWeight: "500" }}>Name*</label>
    //           <input id="name" placeholder="Enter your name" required style={{
    //             padding: "0.5rem",
    //             borderRadius: "0.25rem",
    //             border: "1px solid #ccc",
    //             width: "100%"
    //           }} />
    //         </div>
    //         <div style={{ display: "grid", gap: "0.5rem" }}>
    //           <label htmlFor="surname" style={{ fontWeight: "500" }}>Surname*</label>
    //           <input id="surname" placeholder="Enter your surname" required style={{
    //             padding: "0.5rem",
    //             borderRadius: "0.25rem",
    //             border: "1px solid #ccc",
    //             width: "100%"
    //           }} />
    //         </div>
    //       </div>
    //       <div style={{ display: "grid", gap: "0.5rem" }}>
    //         <label htmlFor="email" style={{ fontWeight: "500" }}>Email*</label>
    //         <input id="email" type="email" placeholder="Enter your email" required style={{
    //           padding: "0.5rem",
    //           borderRadius: "0.25rem",
    //           border: "1px solid #ccc",
    //           width: "100%"
    //         }} />
    //       </div>
    //       <div style={{ display: "grid", gap: "0.5rem" }}>
    //         <label htmlFor="phone" style={{ fontWeight: "500" }}>Phone Number*</label>
    //         <input id="phone" type="tel" placeholder="Enter your phone number" required style={{
    //           padding: "0.5rem",
    //           borderRadius: "0.25rem",
    //           border: "1px solid #ccc",
    //           width: "100%"
    //         }} />
    //       </div>
    //       <div style={{ display: "grid", gap: "0.5rem" }}>
    //         <label htmlFor="description" style={{ fontWeight: "500" }}>Description*</label>
    //         <textarea id="description" rows={3} placeholder="Enter a short description" required style={{
    //           padding: "0.5rem",
    //           borderRadius: "0.25rem",
    //           border: "1px solid #ccc",
    //           width: "100%"
    //         }} />
    //       </div>
    //       <div style={{ display: "grid", gap: "0.5rem" }}>
    //         <label htmlFor="age" style={{ fontWeight: "500" }}>Age*</label>
    //         <input id="age" type="number" placeholder="Enter your age" required style={{
    //           padding: "0.5rem",
    //           borderRadius: "0.25rem",
    //           border: "1px solid #ccc",
    //           width: "100%"
    //         }} />
    //       </div>
    //     </div>
    //     <div style={{
    //       backgroundColor: "#F18F65",
    //       color: "white",
    //       padding: "1rem 1.5rem",
    //       borderBottomLeftRadius: "0.5rem",
    //       borderBottomRightRadius: "0.5rem",
    //       display: "flex",
    //       justifyContent: "flex-end"
    //     }}>
    //       <button type="submit" style={{
    //         backgroundColor: "white",
    //         color: "#FF7024",
    //         padding: "0.5rem 1rem",
    //         borderRadius: "0.25rem",
    //         border: "none",
    //         cursor: "pointer",
    //         transition: "color 0.3s, background-color 0.3s"
    //       }}
    //       onMouseEnter={(e) => {
    //         e.currentTarget.style.backgroundColor = "#FF7024";
    //         e.currentTarget.style.color = "white";
    //       }}
    //       onMouseLeave={(e) => {
    //         e.currentTarget.style.backgroundColor = "white";
    //         e.currentTarget.style.color = "#FF7024";
    //       }}
    //       >
    //         Save Changes
    //       </button>
    //     </div>
    //   </div>


    // <div className="container">
    //         <aside className="aside">
    //             <h2>Настройки</h2>
    //             <a href="/profile">Личная информация</a>
    //             {/* <a href="#">Платная подписка</a> */}
    //         </aside>
    //         <main className="main">
    //             <div className="profile-card">
    //                 <h2>Личная информация</h2>
    //                 <div className="profile-picture">
    //                     <img src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/PngItem_1468843.png" alt="Bordered avatar" />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="email">Ваш email</label>
    //                     <input type="email" id="email" placeholder="your.email@mail.com" required />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="first_name">Ваша Фамилия</label>
    //                     <input type="text" id="first_name" placeholder="Your first name" defaultValue="Jane" required />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="last_name">Ваше Имя</label>
    //                     <input type="text" id="last_name" placeholder="Your last name" defaultValue="Ferguson" required />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="profession">Телефон</label>
    //                     <input type="text" id="profession" placeholder="Your profession" required />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="message">Коротко о вас</label>
    //                     <textarea id="message" placeholder="Write your bio here..."></textarea>
    //                 </div>
    //                 <div className="save-button">
    //                     <button type="submit">Save</button>
    //                 </div>
    //             </div>
    //         </main>

    <div className="container">
    <aside className="aside">
        <h2>Настройки</h2>
        <a href="/profile">Личная информация</a>
    </aside>
    <main className="main">
        <div className="profile-card">
            <h2>Личная информация</h2>
            <div className="profile-picture">
                <img src="https://nf-spotify-hw.s3.eu-north-1.amazonaws.com/img/PngItem_1468843.png" alt="Bordered avatar" />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Ваш email</label>
                    <div className="email-display">{user?.email}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Ваша Фамилия</label>
                    <input 
                        type="text" 
                        id="surname" 
                        name="surname"
                        value={user?.surname || ''}
                        onChange={handleInputChange}
                        placeholder="Введите вашу реальную Фамилию" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Ваше Имя</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={user?.name || ''}
                        onChange={handleInputChange}
                        placeholder="Введите ваше реальное Имя" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Телефон</label>
                    <input 
                        type="text" 
                        id="phoneNumber" 
                        name="phoneNumber"
                        value={user?.phoneNumber || ''}
                        onChange={handleInputChange}
                        placeholder="+77084652675" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="smallDescription">Коротко о вас</label>
                    <textarea 
                        id="smallDescription" 
                        name="smallDescription"
                        value={user?.smallDescription || ''}
                        onChange={handleInputChange}
                        placeholder="Напишите нужную информацию о себе для арендодателей"
                    ></textarea>
                </div>
                <div className="save-button">
                    <button type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    </main>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');

                body {

                    background-color: white;
                    color: #161931;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    padding: 20px;
                    margin: 0 auto;
                }
                .aside {
                    display: none;
                    flex-direction: column;
                    gap: 10px;
                    padding: 20px;
                    border-right: 1px solid #FFBB9A;
                }
                .aside h2 {
                    padding-left: 15px;
                    margin-bottom: 20px;
                    font-size: 24px;
                    font-weight: 600;
                }
                .aside a {
                    display: flex;
                    align-items: center;
                    padding: 10px 15px;
                    font-weight: 600;
                    text-decoration: none;
                    color: #626262;
                    border: 1px solid transparent;
                    border-radius: 9999px;
                }
                .aside a:hover {
                    color: #626262;
                    border: 1px solid #cbd5e0;
                }
                .main {
                    flex-grow: 1;
                    min-height: 100vh;
                    padding: 20px;
                }
                .profile-card {
                    padding: 20px;
                    margin: 20px 0;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .profile-card h2 {
                    padding-left: 15px;
                    font-size: 24px;
                    font-weight: 700;
                }
                .profile-picture {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-top: 20px;
                }
                .profile-picture img {
                    width: 100px;
                    height: 100px;
                    padding: 5px;
                    border-radius: 50%;
                    border: 2px solid #a0aec0;
                }
                .profile-buttons button {
                    padding: 10px 20px;
                    font-size: 16px;
                    font-weight: 600;
                    border: 1px solid #cbd5e0;
                    border-radius: 10px;
                    background-color: #1a202c;
                    color: white;
                    cursor: pointer;
                }
                .profile-buttons button:hover {
                    background-color: #2d3748;
                }
                .profile-buttons button:nth-child(2) {
                    background-color: white;
                    color: #1a202c;
                }
                .profile-buttons button:nth-child(2):hover {
                    background-color: #edf2f7;
                }
                .form-group {
                    margin-top: 20px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #626262;
                }
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 10px;
                    font-size: 14px;
                    color: #1a202c;
                    border: 1px solid #cbd5e0;
                    border-radius: 10px;
                }
                .form-group textarea {
                    resize: vertical;
                    height: 100px;
                }
                .save-button {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 20px;
                }
                .save-button button {
                    padding: 10px 20px;
                    font-size: 14px;
                    font-weight: 600;
                    background-color: #FF7024;
                    color: white;
                    border: 1px solid #FF7024;
                    border-radius: 10px;
                    cursor: pointer;
                }
                .save-button button:hover {
                    background-color: #CB5200;
                }
                .email-display {
                    padding: 10px;
                    font-size: 14px;
                    color: #1a202c;
                    background-color: #f7fafc;
                    border: 1px solid #cbd5e0;
                    border-radius: 10px;
                }

                @media (min-width: 768px) {
                    .container {
                        flex-direction: row;
                        padding: 30px;
                    }
                    .aside {
                        display: flex;
                        width: 25%;
                    }
                    .main {
                        width: 75%;
                        padding: 30px;
                    }
                }
            `}</style>
        </div>
  );
};

export default Profile;