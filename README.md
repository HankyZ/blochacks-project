## General Information
* **Technology used**: Angular7
* **OCR API used**: Cloudmersive OCR
* **Team**: Team Zaza

## Why did we choose Cloudmersive OCR?
We have tested many OCR APIs and all of them have major flaws for our application. Cloudmersive OCR is the one that has the least flaws in comparison.

## How can we improve OCR accuracy?
The main reason why our OCR is not accurate is because we do not have control on how the APIs read the strings, e.g.: what font family to use? what is the expected length of the string? what are the expected characters? etc.

To improve our accuracy, there is a library that we can use which allows us to control all those previously mentioned factors. The library is Matrox Imaging Library (MIL). MIL has a tool called StringReader that does OCR with precise configurations. We believe that with that tool, we can read these codes very accurately. Other than StringReader, MIL has other image processing tools that can improve the quality of the original image to further increase accuracy.

Unfortunately, to test or buy MIL, it takes multiple days. So we were not able to use MIL for this project.

## OCR APIs / libraries Tested
* **Google Cloud Vision**: Even thought this API has the best accuracy, the algorithm discards strings containing long non-alphabet patterns. Therefore if we have a long sequence of "<" (more than 4), it is possible that the API returns us nothing.
* **Microsoft Cognitive Computer Vision, OCR.Space, SemaMediaData**: Same problem as Google Cloud Vision with a worse accuracy.
* **Taggun**: Can only read receipts.
