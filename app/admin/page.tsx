"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import {
  Lock,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  FileText,
  DollarSign,
  Layers,
  Check,
  LogOut,
  AlertCircle,
  Home,
  Bike,
  Eye,
  EyeOff,
  GripVertical,
  Upload
} from "lucide-react";
import { getBrandDetails } from "@/lib/brand";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function AdminPage() {
  const router = useRouter();
  const brand = getBrandDetails();

  // Authentication state
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [authError, setAuthError] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);

  // Check auth session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("admin_authenticated");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
      setIsAuthChecking(false);
    }
  }, []);

  // Catalog State
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductInfo, setDeletingProductInfo] = useState<{ id: string; name: string } | null>(null);
  const [sizesText, setSizesText] = useState("");
  const [colorsText, setColorsText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadIndex, setUploadIndex] = useState<number | null>(null);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // Drag and drop state for images
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleImageDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex || !editingProduct) return;
    
    const updatedImages = [...editingProduct.images];
    const [draggedItem] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(targetIndex, 0, draggedItem);
    
    setEditingProduct({
      ...editingProduct,
      images: updatedImages
    });
    setDraggedIndex(null);
  };

  // Dynamic Specs & Features Form states
  const [formSpecs, setFormSpecs] = useState<{ key: string; value: string }[]>([]);
  const [formFeatures, setFormFeatures] = useState<string[]>([]);

  // Load products in client on auth from database API
  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProducts(data);
          }
        })
        .catch(() => {
          showToast("Failed to load products from database.", "error");
        });
    }
  }, [isAuthenticated]);

  // Intercept back button to close editing/create modal
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isEditing) {
      if (window.history.state?.isModal) {
        window.history.back();
      }
      return;
    }

    // Push a dummy state so back button acts on this state instead of navigating away
    if (!window.history.state?.isModal) {
      window.history.pushState({ isModal: true }, "", window.location.href);
    }

    const handlePopState = () => {
      setIsEditing(false);
      setEditingProduct(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isEditing]);

  // Handle Passcode check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123") {
      setIsAuthenticated(true);
      setAuthError("");
      localStorage.setItem("admin_authenticated", "true");
    } else {
      setAuthError("Invalid passcode. Hint: check developer notes");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
    localStorage.removeItem("admin_authenticated");
  };

  // Toast helper
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  // Switch to Edit Mode
  const startEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setFormSpecs(
      Object.entries(product.specs).map(([key, value]) => ({ key, value }))
    );
    setFormFeatures([...product.features]);
    setSizesText(product.variants?.Sizes?.join(", ") || "");
    setColorsText(product.variants?.Colors?.join(", ") || "");
    setIsEditing(true);
  };

  // Switch to Create Mode
  const startCreate = () => {
    const newProduct: Product = {
      id: String(Date.now()),
      slug: "",
      name: "",
      brand: brand.name + " Premium",
      price: 50000,
      category: "Road",
      featured: false,
      images: [
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80"
      ],
      shortDescription: "",
      description: "",
      specs: {
        Frame: "Alloy Frame",
        Fork: "Alloy Fork",
        Drivetrain: "1x9 speed Drivetrain",
        Brakes: "Mechanical Disc",
        Tires: "700x28c",
        Weight: "11 kg"
      },
      features: ["Lightweight frame configuration"],
      variants: {
        Sizes: ["M", "L"],
        Colors: ["Stealth Grey"]
      }
    };
    
    setEditingProduct(newProduct);
    setFormSpecs(Object.entries(newProduct.specs).map(([key, value]) => ({ key, value })));
    setFormFeatures([...newProduct.features]);
    setSizesText(newProduct.variants?.Sizes?.join(", ") || "");
    setColorsText(newProduct.variants?.Colors?.join(", ") || "");
    setIsEditing(true);
  };

  // Handle Spec Changes
  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...formSpecs];
    updated[index][field] = value;
    setFormSpecs(updated);
  };

  const addSpecRow = () => {
    setFormSpecs([...formSpecs, { key: "", value: "" }]);
  };

  const removeSpecRow = (index: number) => {
    setFormSpecs(formSpecs.filter((_, i) => i !== index));
  };

  // Handle Feature Changes
  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...formFeatures];
    updated[index] = value;
    setFormFeatures(updated);
  };

  const addFeatureRow = () => {
    setFormFeatures([...formFeatures, ""]);
  };

  const removeFeatureRow = (index: number) => {
    setFormFeatures(formFeatures.filter((_, i) => i !== index));
  };

  // Save changes to local state & persist to file
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Convert specs array back to record
    const specRecord: Record<string, string> = {};
    formSpecs.forEach((item) => {
      if (item.key.trim()) specRecord[item.key.trim()] = item.value;
    });

    // Clean features
    const cleanedFeatures = formFeatures.filter((f) => f.trim() !== "");

    // Generate slug from name if empty
    const finalSlug = editingProduct.slug.trim()
      ? editingProduct.slug.trim()
      : editingProduct.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

    const updatedProduct = {
      ...editingProduct,
      slug: finalSlug,
      specs: specRecord,
      features: cleanedFeatures,
      variants: {
        Sizes: sizesText.split(",").map((s) => s.trim()).filter((s) => s !== ""),
        Colors: colorsText.split(",").map((c) => c.trim()).filter((c) => c !== "")
      }
    };

    // Check slug uniqueness
    const slugExists = products.some(
      (p) => p.slug === finalSlug && p.id !== editingProduct.id
    );
    if (slugExists) {
      showToast("A product with this slug already exists.", "error");
      return;
    }

    let updatedList = [...products];
    const index = products.findIndex((p) => p.id === editingProduct.id);

    if (index > -1) {
      updatedList[index] = updatedProduct;
    } else {
      updatedList.push(updatedProduct);
    }

    await persistCatalog(updatedList, "Product listing saved successfully.");
  };

  // Confirm and execute delete listing
  const confirmDeleteProduct = async () => {
    if (!deletingProductInfo) return;
    const { id } = deletingProductInfo;
    const updatedList = products.filter((p) => p.id !== id);
    await persistCatalog(updatedList, "Product listing deleted successfully.");
    setDeletingProductInfo(null);
  };

  // Upload file to ImageKit
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, replaceIndex: number | null = null) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;

    try {
      setIsUploading(true);
      if (replaceIndex !== null) {
        setUploadIndex(replaceIndex);
      } else {
        setUploadIndex(-1); // using -1 for main append loader
      }

      // 1. Fetch secure signature parameters from our server
      const authRes = await fetch("/api/imagekit-auth");
      if (!authRes.ok) {
        const errorData = await authRes.json();
        throw new Error(errorData.error || "Failed to fetch ImageKit credentials.");
      }
      const authData = await authRes.json();

      // 2. Prepare Direct Upload Form Data
      const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error("NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY is not configured.");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", `${editingProduct.slug || "cycle"}-${Date.now()}`);
      formData.append("publicKey", publicKey);
      formData.append("signature", authData.signature);
      formData.append("token", authData.token);
      formData.append("expire", authData.expire);

      // 3. Upload to ImageKit Endpoint
      const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const uploadErr = await uploadRes.json();
        throw new Error(uploadErr.message || "Failed to upload file to ImageKit.");
      }

      const uploadData = await uploadRes.json();
      const uploadedUrl = uploadData.url;

      // 4. Update catalog list
      const updatedImages = [...editingProduct.images];
      if (replaceIndex !== null) {
        updatedImages[replaceIndex] = uploadedUrl;
      } else {
        if (updatedImages.length === 1 && updatedImages[0] === "") {
          updatedImages[0] = uploadedUrl;
        } else {
          updatedImages.push(uploadedUrl);
        }
      }

      setEditingProduct({
        ...editingProduct,
        images: updatedImages,
      });

      showToast("Image uploaded successfully!", "success");
    } catch (err: any) {
      showToast(err.message || "File upload failed.", "error");
    } finally {
      setIsUploading(false);
      setUploadIndex(null);
      e.target.value = "";
    }
  };

  // Persist to API
  const persistCatalog = async (updatedList: Product[], successMsg: string) => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedList)
      });
      
      const result = await response.json();

      if (result.success) {
        setProducts(updatedList);
        setIsEditing(false);
        setEditingProduct(null);
        showToast(successMsg, "success");
      } else {
        showToast(result.error || "Failed to persist changes.", "error");
      }
    } catch (err: any) {
      showToast("Connection error. Could not write to server.", "error");
    }
  };

  // Session check loading screen to avoid flashes
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-6">
        <div className="flex flex-col items-center gap-4 text-zinc-400">
          <div className="w-8 h-8 rounded-full border-2 border-t-zinc-950 border-zinc-200 animate-spin" />
          <span className="text-xs uppercase tracking-widest font-semibold">Verifying Session...</span>
        </div>
      </div>
    );
  }

  // Auth Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-6">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
          <div className="text-center flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold uppercase tracking-tight text-zinc-900">
              Admin Portal
            </h1>
            <p className="text-zinc-500 text-xs mt-1 tracking-wider uppercase">
              Agrawal Cycles Administration
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                Enter Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-center text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors focus:outline-none"
                  aria-label={showPasscode ? "Hide passcode" : "Show passcode"}
                >
                  {showPasscode ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
              {authError && (
                <p className="text-red-500 text-xs font-semibold mt-2 flex items-center gap-1.5 justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {authError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4.5 bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Authenticate
            </button>

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-1.5 py-4.5 border border-zinc-200 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-650 hover:bg-zinc-50 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to Homepage
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Stats
  const totalBikes = products.length;
  const avgPrice = totalBikes > 0 ? Math.round(products.reduce((acc, p) => acc + p.price, 0) / totalBikes) : 0;
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category))).length;

  return (
    <div className="bg-zinc-50/50 min-h-screen pt-24 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-24 right-6 z-50 flex items-center gap-2.5 py-4 px-6 rounded-2xl shadow-lg border text-sm font-semibold uppercase tracking-wider animate-slide-in ${
            toastType === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <Check className="w-4.5 h-4.5" />
          {toastMessage}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Administrator Mode
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-sans font-black uppercase tracking-tight text-zinc-900 mt-1">
              Bicycle <span className="text-zinc-400 font-light italic">Listings</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={startCreate}
              className="flex items-center gap-1.5 py-3 px-5 rounded-full bg-zinc-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add New Bike
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 py-3 px-5 rounded-full border border-zinc-200 bg-white text-zinc-650 hover:bg-zinc-100 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid View */}
        {!isEditing && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-105 text-zinc-950 flex items-center justify-center shrink-0">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Total Listings</span>
                  <span className="text-2xl font-bold text-zinc-900">{totalBikes} Bicycles</span>
                </div>
              </div>
              
              <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-105 text-zinc-950 flex items-center justify-center shrink-0">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Average Retail Price</span>
                  <span className="text-2xl font-bold text-zinc-900">{formatPrice(avgPrice)}</span>
                </div>
              </div>

              <div className="bg-white border border-zinc-200/80 p-6 rounded-2xl shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-105 text-zinc-950 flex items-center justify-center shrink-0">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Total Categories</span>
                  <span className="text-2xl font-bold text-zinc-900">{uniqueCategories} Collections</span>
                </div>
              </div>
            </div>

            {/* List Table Block */}
            <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs">
              <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-zinc-900">
                  Inventory Listings ({totalBikes})
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-zinc-50 border-b border-zinc-100 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    <tr>
                      <th className="px-6 py-4">Bicycle</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Retail Price</th>
                      <th className="px-6 py-4">Featured</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg bg-zinc-50 border border-zinc-200 overflow-hidden shrink-0">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-zinc-900">{p.name}</h4>
                              <p className="text-zinc-400 text-xs uppercase font-semibold">{p.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-zinc-900">
                          {formatPrice(p.price)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.featured ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-450"
                          }`}>
                            {p.featured ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => startEdit(p)}
                              className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-100 hover:text-zinc-950 text-zinc-500 transition-colors"
                              title="Edit Listing"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeletingProductInfo({ id: p.id, name: p.name })}
                              className="p-2 border border-zinc-250 rounded-lg hover:bg-red-50 hover:text-red-650 text-zinc-450 transition-colors"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Editing / Creating Form Block */}
        {isEditing && editingProduct && (
          <form onSubmit={saveProduct} className="bg-white border border-zinc-250 rounded-3xl overflow-hidden shadow-xs max-w-4xl mx-auto">
            <div className="px-6 py-5 border-b border-zinc-150 flex items-center justify-between bg-zinc-50/50">
              <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-zinc-900">
                {editingProduct.id.length > 8 ? "Create New Product Listing" : `Edit Listing: ${editingProduct.name}`}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingProduct(null);
                }}
                className="p-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-100 text-zinc-500 transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Part 1: General Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-4">
                  1. General Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Bicycle Name
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      placeholder="e.g. AeroStream Carbon X"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Brand Line
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.brand}
                      onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Retail Price (INR)
                    </label>
                    <input
                      type="number"
                      required
                      min="1000"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Category Collection
                    </label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    >
                      <option value="Road">Road</option>
                      <option value="Mountain">Mountain</option>
                      <option value="Gravel">Gravel</option>
                      <option value="Electric">Electric</option>
                      <option value="Urban">Urban</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      URL Slug (Optional - Autogenerated if blank)
                    </label>
                    <input
                      type="text"
                      value={editingProduct.slug}
                      onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                      placeholder="e.g. aerostream-carbon-x"
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={editingProduct.featured}
                      onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-zinc-200 text-zinc-950 focus:ring-zinc-950"
                    />
                    <label htmlFor="featured" className="text-xs font-bold uppercase tracking-wider text-zinc-650 cursor-pointer">
                      Feature on Homepage
                    </label>
                  </div>
                </div>
              </div>

              {/* Part 2: Descriptions & Media */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-4">
                  2. Descriptions & Media
                </h4>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Short Description (For Cards)
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.shortDescription}
                      onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                      placeholder="e.g. Engineered for raw speed and aerodynamics..."
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Full Description (HTML/Paragraph for Detail Sheet)
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950 resize-y"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Product Gallery Images
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            if (editingProduct) {
                              setEditingProduct({
                                ...editingProduct,
                                images: [...editingProduct.images, ""]
                              });
                            }
                          }}
                          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-950 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Image URL Field
                        </button>

                        <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 cursor-pointer">
                          <Upload className="w-3.5 h-3.5" /> Upload File to ImageKit
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, null)}
                            className="hidden"
                            disabled={isUploading}
                          />
                        </label>
                        {isUploading && uploadIndex === -1 && (
                          <span className="text-[10px] text-emerald-600 animate-pulse font-semibold uppercase">Uploading...</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {editingProduct.images.map((imgUrl, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={() => setDraggedIndex(index)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => handleImageDrop(index)}
                          onDragEnd={() => setDraggedIndex(null)}
                          className={`flex gap-3 items-center p-2.5 rounded-xl border transition-all duration-200 bg-zinc-50/50 ${
                            draggedIndex === index
                              ? "border-zinc-450 bg-zinc-100 opacity-50 scale-[0.98] shadow-inner"
                              : "border-zinc-200 hover:border-zinc-300"
                          }`}
                        >
                          <div className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-700 p-1 shrink-0" title="Drag to reorder">
                            <GripVertical className="w-4 h-4" />
                          </div>
                          
                          <input
                            type="text"
                            required
                            placeholder="https://images.unsplash.com/... (Image URL)"
                            value={imgUrl}
                            onChange={(e) => {
                              const updatedImages = [...editingProduct.images];
                              updatedImages[index] = e.target.value;
                              setEditingProduct({
                                ...editingProduct,
                                images: updatedImages
                              });
                            }}
                            className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-zinc-950"
                          />

                          <label className="p-2 border border-zinc-200 rounded-lg text-zinc-400 hover:text-emerald-600 hover:bg-zinc-50 shrink-0 cursor-pointer relative" title="Upload File to Replace">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isUploading}
                              onChange={(e) => handleFileUpload(e, index)}
                            />
                            {isUploading && uploadIndex === index ? (
                              <div className="w-3.5 h-3.5 border-2 border-t-emerald-600 border-zinc-300 rounded-full animate-spin" />
                            ) : (
                              <Upload className="w-3.5 h-3.5" />
                            )}
                          </label>
                          
                          <button
                            type="button"
                            onClick={() => {
                              if (editingProduct.images.length > 1) {
                                setEditingProduct({
                                  ...editingProduct,
                                  images: editingProduct.images.filter((_, i) => i !== index)
                                });
                              } else {
                                showToast("At least one product image is required.", "error");
                              }
                            }}
                            className="p-2 border border-zinc-200 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-50 shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 3: Specs Builder */}
              <div>
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    3. Build Specifications Table
                  </h4>
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-950"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Row
                  </button>
                </div>

                <div className="space-y-3">
                  {formSpecs.map((spec, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Specification Title (e.g. Frame)"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                        className="w-1/3 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-semibold uppercase tracking-wider focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Details (e.g. Carbon T800 monocoque)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                        className="w-2/3 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecRow(index)}
                        className="p-2 border border-zinc-200 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 4: Key Technologies Highlights */}
              <div>
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    4. Key Technologies Highlights
                  </h4>
                  <button
                    type="button"
                    onClick={addFeatureRow}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-950"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Row
                  </button>
                </div>

                <div className="space-y-3">
                  {formFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Feature Description (e.g. Integrated carbon cockpit with hidden cable routing)"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeatureRow(index)}
                        className="p-2 border border-zinc-200 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-zinc-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 5: Variants */}
              {editingProduct.variants && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 pb-2 mb-4">
                    5. Sizing & Colors Variants
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Available Sizes (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={sizesText}
                        onChange={(e) => setSizesText(e.target.value)}
                        placeholder="e.g. S, M, L, XL"
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                        Colorways (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={colorsText}
                        onChange={(e) => setColorsText(e.target.value)}
                        placeholder="e.g. Stealth Black, Crimson Red"
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-zinc-950"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="px-8 py-5 border-t border-zinc-150 flex items-center justify-end gap-3 bg-zinc-50/50">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingProduct(null);
                }}
                className="py-3.5 px-6 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-650 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="flex items-center gap-1.5 py-3.5 px-6 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                Save Product Listing
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Deletion Confirmation Modal Overlay */}
      {deletingProductInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 shadow-2xl mx-4 transform scale-100 transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-5 border border-red-100">
                <Trash2 className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-zinc-950">
                Confirm Deletion
              </h3>
              <p className="text-zinc-555 text-sm leading-relaxed mt-3 font-light">
                Are you sure you want to delete <strong className="text-zinc-900 font-semibold">"{deletingProductInfo.name}"</strong>?<br />
                This action cannot be undone and will immediately remove the listing from the catalog database.
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingProductInfo(null)}
                className="flex-1 py-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-650 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                No, Keep It
              </button>
              
              <button
                type="button"
                onClick={confirmDeleteProduct}
                className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
