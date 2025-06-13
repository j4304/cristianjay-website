"use client";
import { useState } from "react";
import { motion } from "framer-motion"; // ✅ Add this

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
import {
  FaFacebookF,
  FaYoutube,
  FaGithub,
  FaDiscord,
  FaInstagram,
  FaSpotify,
  FaEnvelope,
} from "react-icons/fa";

export default function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <div className="bg-black text-white min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-white/70">
                Have a project in mind or just want to say hello? I&apos;d love
                to hear from you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-6">Let&apos;s Connect</h2>
                <div className="space-y-6">
                  <p className="text-white/70">
                    I&apos;m always open to discussing new opportunities,
                    interesting projects, or just having a chat about technology
                    and development.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <FaEnvelope className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-white/70">
                          cristianjaycosep@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div className="pt-6">
                    <h3 className="font-semibold mb-4">Follow Me</h3>
                    <div className="flex space-x-4">
                      {[
                        {
                          href: "https://www.facebook.com/jay4304",
                          icon: <FaFacebookF className="w-5 h-5 text-white" />,
                        },
                        {
                          href: "https://github.com/j4304",
                          icon: <FaGithub className="w-5 h-5 text-white" />,
                        },
                        {
                          href: "https://www.youtube.com/@j_ckfx",
                          icon: <FaYoutube className="w-5 h-5 text-white" />,
                        },
                        {
                          href: "https://discordapp.com/users/442560963565191189",
                          icon: <FaDiscord className="w-5 h-5 text-white" />,
                        },
                        {
                          href: "https://www.instagram.com/j_cckkk/",
                          icon: <FaInstagram className="w-5 h-5 text-white" />,
                        },
                        {
                          href: "https://open.spotify.com/user/312koekih64gcev7jacj2df4ms5y?si=b6a109f8dec949dd",
                          icon: <FaSpotify className="w-5 h-5 text-white" />,
                        },
                      ].map(({ href, icon }, index) => (
                        <motion.a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/10 rounded-lg"
                          initial={{ opacity: 0, scale: 0.8, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.2 }}
                        >
                          {icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form Section */}
              <div>
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {["name", "email", "subject"].map((field) => (
                    <motion.input
                      key={field}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() +
                        field.slice(1).replace("name", "Your Name")
                      }
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg placeholder-white/50 text-white"
                      whileFocus={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    />
                  ))}

                  <motion.textarea
                    disabled
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg placeholder-white/50 text-white"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />

                  <motion.button
                    type="submit"
                    disabled
                    className="bg-white/10 text-white px-6 py-3 rounded-lg cursor-not-allowed opacity-50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    Send Message (Disabled)
                  </motion.button>
                </motion.form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-zinc-900 text-white mt-auto py-4 overflow-hidden">
        <div className="container relative mx-auto px-2 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <div className="z-10 flex items-center gap-3"></div>

          <div className="z-10 text-xs text-zinc-400 text-center md:text-right">
            © {new Date().getFullYear()} Cristian Jay Cosep. All rights
            reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
