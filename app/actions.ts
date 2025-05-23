"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { type Moment, type MomentInsert, type MomentUpdate, ImpactLevel } from "@/utils/supabase/supabase";
import { isValidImpactLevel, isValidMomentType, isValidSourceType, isValidTimeOfDay } from "@/lib/types";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;
  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${APP_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const callbackUrl = formData.get("callbackUrl")?.toString();
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${APP_URL}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
};

export const createMoment = async (data: MomentInsert) => {
  const supabase = await createClient();
  
  // Validate inputs
  if (!data.type || !isValidMomentType(data.type)) {
    throw new Error("Invalid moment type");
  }
  
  if (!data.impact || !isValidImpactLevel(data.impact)) {
    throw new Error("Invalid impact level");
  }
  
  if (data.source && !isValidSourceType(data.source)) {
    throw new Error("Invalid source type");
  }
  
  if (data.time_of_day && !isValidTimeOfDay(data.time_of_day)) {
    throw new Error("Invalid time of day");
  }

  const { data: momentData, error } = await supabase
    .from("moments")
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }

  return momentData as Moment;
};

export const updateMoment = async (id: string, data: MomentUpdate) => {
  const supabase = await createClient();
  
  // Validate inputs
  if (data.type && !isValidMomentType(data.type)) {
    throw new Error("Invalid moment type");
  }
  
  if (data.impact && !isValidImpactLevel(data.impact)) {
    throw new Error("Invalid impact level");
  }
  
  if (data.source && !isValidSourceType(data.source)) {
    throw new Error("Invalid source type");
  }
  
  if (data.time_of_day && !isValidTimeOfDay(data.time_of_day)) {
    throw new Error("Invalid time of day");
  }

  const { data: momentData, error } = await supabase
    .from("moments")
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }

  return momentData as Moment;
};

export const deleteMoment = async (id: string) => {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("moments")
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }

  return { success: true };
};
