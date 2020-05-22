using System;
using System.Net;
using System.Runtime.Serialization;

namespace Application.Errors
{
    public class RestException : Exception
    {
        public HttpStatusCode Code { get; }
        public object Errors { get; }

        public RestException(HttpStatusCode code, object erros = null)
        {
            Errors = erros;
            Code = code;
        }
    }
}