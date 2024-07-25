// // 'use client';

// // import React from 'react';
// // import { useSignIn } from "@clerk/nextjs";
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from '@/app/context/context';

// // function GoogleLoginButton() {
// //   const { signIn } = useSignIn();
// //   const router = useRouter();
// //   const { setIsLoggedIn } = useAuth();

// //   const handleGoogleLogin = async () => {
// //     try {
// //       if (signIn) {
// //         await signIn.authenticateWithRedirect({
// //           strategy: "oauth_google",
// //           redirectUrl: "/",
// //           redirectUrlComplete: "/"
// //         });
// //       }
// //     } catch (error) {
// //       console.error('Error during Google sign-in:', error);
// //     }
// //   };


// //   return (
// //     <button
// //       onClick={handleGoogleLogin}
// //       className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
// //     >
// //       <img
// //         src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
// //         alt="Google logo"
// //         className="w-5 h-5 mr-2"
// //       />
// //       Войти через Google
// //     </button>
// //   );
// // }

// // export default GoogleLoginButton;

// 'use client';
// import React from 'react';
// import { useSignIn, useSignUp } from "@clerk/nextjs";
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/app/context/context';

// function GoogleAuthButton() {
//   const { signIn } = useSignIn();
//   const { signUp } = useSignUp();
//   const router = useRouter();
//   const { setIsLoggedIn } = useAuth();

//   const handleGoogleAuth = async () => {
//     try {
//       if (signUp) {
//         const result = await signUp.create({
//             strategy: "oauth_google",
//             redirectUrl: "/"
//         });

//         if (result.status === 'complete') {
//             setIsLoggedIn(true);
//             router.push('/profile');
//         if(result.emailAddress) {
//             router.push('/profile');
//         }
//         } else {
//             // The user already exists, so let's sign them in instead
//             if (signIn) {
//                 await signIn.authenticateWithRedirect({
//                     strategy: "oauth_google",
//                     redirectUrl: "/",
//                     redirectUrlComplete: "/"
//                 });
//             }
//         }
//       }
//     } catch (error) {
//       console.error('Error during Google authentication:', error);
//     }
//   };

//   return (
//     <button
//       onClick={handleGoogleAuth}
//       className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//     >
//       <img
//         src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
//         alt="Google logo"
//         className="w-5 h-5 mr-2"
//       />
//       Войти через Google
//     </button>
//   );
// }

// export default GoogleAuthButton;