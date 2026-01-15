// একটি ছোট স্ক্রিপ্ট যোগ করুন বাটন হিসেবে
"use client";
import Swal from "sweetalert2";

const handleShare = () => {
  Swal.fire({
    title: "লিঙ্ক কপি হয়েছে!",
    text: "খবরটি আপনার বন্ধুদের সাথে শেয়ার করুন।",
    icon: "success",
    toast: true,
    position: "top-end",
    timer: 3000,
    showConfirmButton: false,
  });
};
