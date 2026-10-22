import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=resolve(fileURLToPath(new URL('../',import.meta.url)));
const port=Number(process.env.PORT||4173);
const mimetype={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.webmanifest':'application/manifest+json','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
export const security={
'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin',
'X-Frame-Options':'DENY','Cross-Origin-Opener-Policy':'same-origin',
'Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"
};
export function resolvePublicPath(url){
 let path;
 try{path=decodeURIComponent(new URL(url,'http://localhost').pathname)}catch{return null}
 if(!path.startsWith('/')||path.includes('\0')||path.split('/').includes('..'))return null;
 const pure=path.replace(/\/$/,'')||'/';
 if(['/', '/play','/intelligence','/academy','/development'].includes(pure))return resolve(root,'index.html');
 if(path.startsWith('/src/')||path.startsWith('/assets/'))return resolve(root,'.'+path);
 if(['/index.html','/robots.txt','/sitemap.xml','/manifest.webmanifest'].includes(path))return resolve(root,'.'+path);
 return null;
}
const app=createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,security);res.end();return}
 const file=resolvePublicPath(req.url);
 if(!file || !(file===root||file.startsWith(root+sep))){res.writeHead(404,security);res.end('Not found');return}
 try{
   const details=await stat(file);
   if(!details.isFile())throw Error('Not a file');
   const body=await readFile(file);
   res.writeHead(200,{...security,'Content-Type':mimetype[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','Content-Length':body.length});
   res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(404,security);res.end('Not found')}
});
if(process.env.OSGARD_TEST_SERVER!=='1')app.listen(port,'0.0.0.0',()=>console.log('OSGARD Universe: http://localhost:'+port));
export {app};
