import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
})

export async function uploadAudioToCloudinary(
  buffer: Buffer,
  filename: string
): Promise<{ url: string; publicId: string; duration: number }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',  // Cloudinary uses 'video' for audio files too
        folder: 'meetuoo/audio',
        public_id: `${Date.now()}-${filename.replace(/\s+/g, '-')}`,
      },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve({
          url:      result.secure_url,
          publicId: result.public_id,
          duration: result.duration ?? 0,
        })
      }
    )

    // Write buffer to the upload stream
    const { Readable } = require('stream')
    const readable = new Readable()
    readable.push(buffer)
    readable.push(null)
    readable.pipe(stream)
  })
}

export async function deleteAudioFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: 'video' })
}