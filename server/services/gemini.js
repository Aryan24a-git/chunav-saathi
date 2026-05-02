/**
 * Google Generative AI Service
 * Official SDK: @google/generative-ai
 * Documentation: ai.google.dev
 */
const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const chatModel = genAI.getGenerativeModel({
  model: 'gemini-3-flash-preview',
  systemInstruction: `You are Chunav Saathi...`
})

const quizModel = genAI.getGenerativeModel({
  model: 'gemini-3-flash-preview'
})

module.exports = { genAI, chatModel, quizModel }
